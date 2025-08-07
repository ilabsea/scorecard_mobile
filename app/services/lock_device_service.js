import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'moment';
import { currentDateTime } from '../utils/date_util';
import { getTimeFromMilliseconds } from '../utils/time_util';
import { lockConditions } from '../utils/lock_device_util';

const lockDeviceService = (() => {
  return {
    countInvalidRequest,
    isLocked,
    unlockAt,
    hasFailAttempt,
    isWithinInterval,
  }

  // Failed sign in attempt data:
  // { locked: boolean,
  //   failed_at: datetime,
  //   locked_at: datetime,
  //   count: int
  // }
  async function countInvalidRequest(lockType) {
    let lockData = await AsyncStorage.getItem(lockType);
    lockData = JSON.parse(lockData) || {};

    const failedCount = Object.keys(lockData).length > 0 ? parseInt(lockData.count) + 1 : 1;
    lockData.count = failedCount;

    if (failedCount === 1) {
      lockData['failed_at'] = currentDateTime();
      lockData.locked = false;
    }

    const { reset_count_duration, max_attempt } = lockConditions(lockType);
    const isWithinResetCountInterval = isWithinInterval(lockData['failed_at'], reset_count_duration);

    if (failedCount === max_attempt && isWithinResetCountInterval) {
      lockData['locked_at'] = currentDateTime();
      lockData.locked = true;
    }

    AsyncStorage.setItem(lockType, JSON.stringify(lockData));
  }

  async function isLocked(lockType) {
    const lockData = await AsyncStorage.getItem(lockType);

    if (!lockData)
      return false;

    return JSON.parse(lockData).locked;
  }

  async function unlockAt(lockType) {
    let lockData = await AsyncStorage.getItem(lockType);
    if (!lockData)
      return '';

    lockData = JSON.parse(lockData);
    if (!lockData.locked)
      return '';

    let lockedAt = lockData.locked_at;
    lockedAt = Moment(lockedAt).valueOf();
    const unlockAt = lockedAt + lockConditions(lockType).reset_lock_duration;
    return getTimeFromMilliseconds(unlockAt)
  }

  async function hasFailAttempt(lockType) {
    return !!await AsyncStorage.getItem(lockType);
  }

  function isWithinInterval(actionDatetime, intervalDuration) {
    const endOfInterval = Moment(actionDatetime).valueOf() + intervalDuration;
    const currentDatetime = currentDateTime().valueOf();
    return currentDatetime <= endOfInterval;
  }
})();

export default lockDeviceService;