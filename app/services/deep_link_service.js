import { Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import newScorecardService from './new_scorecard_service';
import { getErrorType } from './api_service';
import lockDeviceService from './lock_device_service';
import resetLockService from './reset_lock_service';
import Scorecard from '../models/Scorecard';
import { isNumber, extractNumber } from '../utils/string_util';
import scorecardProgress from '../db/jsons/scorecardProgress';
import { ERROR_INCORRECT_SCORECARD_CODE, ERROR_DEVICE_LOCKED } from '../constants/error_constant';
import { INVALID_SCORECARD_ATTEMPT } from '../constants/lock_device_constant';

import { navigationRef } from '../navigators/app_navigator';

const deepLinkService = (() => {
  return {
    watchInitialURL,
    watchIncommingDeepLink,
  }

  async function watchInitialURL() {
    const initialUrl = await Linking.getInitialURL();
    if (!!initialUrl)
      AsyncStorage.setItem('INITIAL_URL', initialUrl);
  }

  async function watchIncommingDeepLink(updateModalStatus, closeModal, handleOccupiedScorecard) {
    const initialUrl = await AsyncStorage.getItem('INITIAL_URL');
    // Handle redirection when the app is killed
    if (!!initialUrl) {
      AsyncStorage.removeItem('INITIAL_URL');
      _handleRedirection(initialUrl, updateModalStatus, closeModal, handleOccupiedScorecard);
    }

    // Handle redirection when the app is in background
    if (!await AsyncStorage.getItem('HANDLE_DEEP_LINK')) {
      AsyncStorage.setItem('HANDLE_DEEP_LINK', 'true');

      Linking.addEventListener('url', (res) => {
        _handleRedirection(res.url, updateModalStatus, closeModal, handleOccupiedScorecard);
      })
    }
  }

  //Private method
  async function _handleRedirection(url, updateModalStatus, closeModal, handleOccupiedScorecard) {
    // Show locked message when the device is locked
    if (await lockDeviceService.isLocked(INVALID_SCORECARD_ATTEMPT)) {
      updateModalStatus(false, scorecardUuid, ERROR_DEVICE_LOCKED, true)
      return;
    }

    const scorecardUuid = url.slice(-6);
    // If the last 6 digits include a special character or letter, shows an incorrect scorecard code message
    if (!isNumber(scorecardUuid)) {
      if (extractNumber(scorecardUuid) != '')
        updateModalStatus(false, scorecardUuid, ERROR_INCORRECT_SCORECARD_CODE, false);

      return;  
    }

    updateModalStatus(true, scorecardUuid, null, false);        // Show loading popup modal

    setTimeout(() => {
      newScorecardService.handleExistedScorecard(scorecardUuid, () => {
        if (!!Scorecard.find(scorecardUuid)) {
          resetLockService.resetLockData(INVALID_SCORECARD_ATTEMPT);
          closeModal();
          _redirectTo('ScorecardDetail', { scorecard_uuid: scorecardUuid });
          return;
        }

        newScorecardService.joinScorecard(scorecardUuid,
          (errorType, isLocked, isInvalidScorecard) => updateModalStatus(false, scorecardUuid, errorType, isInvalidScorecard),          // Error caused by the scorecard status
          () => _joinScorecardSuccess(scorecardUuid, closeModal),
          (error, isLocked, isInvalidScorecard) => updateModalStatus(false, scorecardUuid, getErrorType(error.status), isInvalidScorecard)         // Error caused by the request issue (ex: no internet connection, ...)
        );
      }, () => _handleExistingScorecard(scorecardUuid, closeModal, handleOccupiedScorecard)); // Handle redirection when scorecard is already exist in the app
    }, 50);
  }

  function _joinScorecardSuccess(scorecardUuid, closeModal) {
    closeModal();
    _redirectTo('ScorecardDetail', { scorecard_uuid: scorecardUuid });
  }

  function _handleExistingScorecard(scorecardUuid, closeModal, handleOccupiedScorecard) {
    resetLockService.resetLockData(INVALID_SCORECARD_ATTEMPT);
    const scorecard = Scorecard.find(scorecardUuid);
    closeModal();

    if (scorecard.isUploaded || scorecard.finished) {
      handleOccupiedScorecard(scorecard);
      return;
    }

    const step = scorecardProgress[scorecard.status - 1];
    _redirectTo(step.routeName, { scorecard_uuid: scorecardUuid, local_ngo_id: scorecard.local_ngo_id });
  }

  function _redirectTo(screenName, params) {
    navigationRef.current?.reset({ index: 1, routes: [
      { name: 'Home' },
      { name: screenName, params: params }
    ]});
  }
})();

export default deepLinkService;