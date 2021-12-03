import AsyncStorage from '@react-native-community/async-storage';
import ScorecardService from './scorecardService';
import { load as loadProgramLanguage } from './program_language_service';
import validationService from './validation_service';
import { isDownloaded } from './scorecard_download_service';
import scorecardTracingStepsService from './scorecard_tracing_steps_service';
import scorecardHelper from '../helpers/scorecard_helper';
import Scorecard from '../models/Scorecard';
import { ERROR_SCORECARD } from '../constants/error_constant';

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

    scorecardService.find(scorecardUuid, (responseData) => {
      AsyncStorage.setItem('IS_CONNECTED', 'true');
      if (responseData === null || !scorecardHelper.isScorecardAvailable(responseData)) {
        const errorType = responseData === null ? ERROR_SCORECARD : scorecardHelper.getScorecardErrorType(responseData);
        errorScorecardCallback(errorType);
      }
      else {
        Scorecard.upsert(responseData);
        loadProgramLanguage(responseData.program_id, (response) => {
          scorecardTracingStepsService.trace(scorecardUuid, 0);
          successCallback();
        });
      }
    }, (error) => {
      AsyncStorage.setItem('IS_CONNECTED', 'true');
      errorCallback(error);
    });
  }
})();

export default newScorecardService;