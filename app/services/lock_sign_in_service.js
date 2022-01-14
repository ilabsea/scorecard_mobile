import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'moment';
import { environment } from '../config/environment';
import { currentDateTime } from '../utils/date_util';
import { getTimeFromMiliseconds } from '../utils/time_util';

const failedSignInAttempt = 'FAILED_SIGN_IN_ATTEMPT';

const lockSignInService = (() => {
  return {
    countInvalidAuthentication,
    isLocked,
    unLockAt,
    resetLock,
  }

  // failed sign in attempt data:
  // { locked: boolean,
  //   failed_at: datetime,
  //   count: int
  // }
  async function countInvalidAuthentication() {
    let signInAttempt = await AsyncStorage.getItem(failedSignInAttempt);
    signInAttempt = JSON.parse(signInAttempt) || {};

    const failedCount = Object.keys(signInAttempt).length > 0 ? parseInt(signInAttempt.count) + 1 : 1;
    signInAttempt.count = failedCount;

    if (failedCount === 1) {
      signInAttempt['failed_at'] = currentDateTime();
      signInAttempt.locked = false;
    }

    if (failedCount === environment.maxSignInAttempt)
      signInAttempt.locked = true;

    AsyncStorage.setItem(failedSignInAttempt, JSON.stringify(signInAttempt));
  }

  async function isLocked() {
    const signInAttempt = await AsyncStorage.getItem(failedSignInAttempt);

    if (!signInAttempt)
      return false;

    return JSON.parse(signInAttempt).locked;
  }

  async function unLockAt() {
    const signInAttempt = await AsyncStorage.getItem(failedSignInAttempt);

    if (!signInAttempt)
      return '';

    let failedAt = JSON.parse(signInAttempt).failed_at;
    failedAt = Moment(failedAt).valueOf();
    const unlockAt = failedAt + environment.lockRequestInterval;

    return getTimeFromMiliseconds(unlockAt)
  }

  function resetLock() {
    AsyncStorage.removeItem(failedSignInAttempt);
  }
})();

export default lockSignInService;