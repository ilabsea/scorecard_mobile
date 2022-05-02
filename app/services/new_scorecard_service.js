import AsyncStorage from '@react-native-community/async-storage';
import ScorecardService from './scorecardService';
import { load as loadProgramLanguage } from './program_language_service';
import validationService from './validation_service';
import { isDownloaded } from './scorecard_download_service';
import scorecardTracingStepsService from './scorecard_tracing_steps_service';
import { getErrorType } from './api_service';
import lockDeviceService from './lock_device_service';
import resetLockService from './reset_lock_service';
import scorecardHelper from '../helpers/scorecard_helper';
import Scorecard from '../models/Scorecard';
import { ERROR_SCORECARD, ERROR_UNAUTHORIZED, ERROR_NOT_FOUND } from '../constants/error_constant';
import { INVALID_SCORECARD_ATTEMPT } from '../constants/lock_device_constant';

const newScorecardService = (() => {
  return {
    isValidScorecard,
    handleExistedScorecard,
    joinScorecard
  }

  function isValidScorecard(scorecardUuid) {
    return validationService('scorecardCode', scorecardUuid) ? false : true;
  }

  function handleExistedScorecard(scorecardUuid, isDownloadedCallback, notDownloadedCallback) {
    AsyncStorage.setItem('SELECTED_SCORECARD_UUID', scorecardUuid);

    if (!isDownloaded(scorecardUuid)) {
      isDownloadedCallback();
      return;
    }

    notDownloadedCallback();
  }

  function joinScorecard(scorecardUuid, errorScorecardCallback, successCallback, errorCallback) {
    const scorecardService = new ScorecardService();

    scorecardService.find(scorecardUuid, async (responseData) => {
      AsyncStorage.setItem('IS_CONNECTED', 'true');
      if (responseData === null || !scorecardHelper.isScorecardAvailable(responseData)) {
        const errorType = responseData === null ? ERROR_SCORECARD : scorecardHelper.getScorecardErrorType(responseData);
        _countJoinInvalidScorecard();
        _timeoutErrorCallback(errorType, errorScorecardCallback, true);
      }
      else {
        resetLockService.resetLockData(INVALID_SCORECARD_ATTEMPT);
        await Scorecard.upsert(responseData);
        loadProgramLanguage(responseData.program_id, (response) => {
          scorecardTracingStepsService.trace(scorecardUuid, 0);
          successCallback();
        });
      }
    }, (error) => {
      let isInvalidScorecard = false;

      if (_isErrorInvalidScorecard(error.status)) {
        isInvalidScorecard = true;
        _countJoinInvalidScorecard();
      }

      AsyncStorage.setItem('IS_CONNECTED', 'true');
      _timeoutErrorCallback(error, errorCallback, isInvalidScorecard);
    });
  }

  // private methods
  function _timeoutErrorCallback(error, errorCallback, isInvalidScorecard) {
    setTimeout(async () => {
      const isLocked = await lockDeviceService.isLocked(INVALID_SCORECARD_ATTEMPT);
      errorCallback(error, isLocked, isInvalidScorecard);
    }, 200);
  }

  function _isErrorInvalidScorecard(errorStatus) {
    const errorType = getErrorType(errorStatus);
    if (errorType === ERROR_NOT_FOUND || errorType === ERROR_UNAUTHORIZED)
      return true;

    return false;
  }

  function _countJoinInvalidScorecard() {
    lockDeviceService.countInvalidRequest(INVALID_SCORECARD_ATTEMPT);
  }
})();

export default newScorecardService;