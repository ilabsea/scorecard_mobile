import Scorecard from '../models/Scorecard';
import Indicator from '../models/Indicator';
import CustomIndicatorApi from '../api/CustomIndicatorApi';
import { scorecardAttributes } from '../utils/scorecard_attributes_util';
import { getErrorType, handleApiResponse } from './api_service';
import {
  downloadFileFromUrl,
  isFileExist,
} from './local_file_system_service';
import ScorecardApi from '../api/ScorecardApi';
import settingHelper from '../helpers/setting_helper';

const scorecardApi = new ScorecardApi();

const onlineScorecardSubmissionService = (() => {
  return {
    draftSubmit,
    downloadVotingQrCode,
    getVotingStats
  }

  async function draftSubmit({scorecardUuid, successCallback, errorCallback}) {
    // Step 1: upload custom indicators, Step 2: upload scorecard with its dependency
    uploadCustomIndicators(scorecardUuid, successCallback, errorCallback);
  }

  function uploadCustomIndicators(scorecardUuid, successCallback, errorCallback) {
    const customIndicators = Indicator.getCustomIndicators(scorecardUuid);
    const customIndicatorsWithNoId = customIndicators.filter(x => !x.id);
    // Step 1
    uploadCustomIndicator(0, customIndicatorsWithNoId, scorecardUuid, successCallback, errorCallback);
  }

  // upload all custom indicators then upload scorecard with its dependcy
  function uploadCustomIndicator(index, indicators, scorecardUuid, successCallback, errorCallback) {
    if (index == indicators.length) {
      // Step 2: upload scorecard with its dependency
      uploadScorecard(scorecardUuid, successCallback, errorCallback);
      return ;
    }

    const customIndicator = indicators[index];
    CustomIndicatorApi.post(scorecardUuid, customIndicator, (response) => {
      if (!!response && !!response.id) {
        // Update the id of the custom indicator with the id that received from the server
        // This 'id' is used as 'indicatorable_id' when submitting the scorecard
        Indicator.update(customIndicator.indicator_uuid, { id: response.id }, scorecardUuid);
      }
      uploadCustomIndicator(index + 1, indicators, scorecardUuid, successCallback, errorCallback);
    }, (errorType) => {
      !!errorCallback && errorCallback(errorType);
    })
  }

  async function uploadScorecard(scorecardUuid, successCallback, errorCallback) {
    const scorecard = Scorecard.find(scorecardUuid);
    let attrs = await scorecardAttributes({
      scorecard: scorecard,
      isFinalSubmit: false
    });
    scorecardApi.put(scorecardUuid, attrs)
      .then(function (response) {
        if (response.status == 200) {
          if (scorecard.status < 4)
            Scorecard.update(scorecardUuid, {status: '4'})

          successCallback();
        }
        else if (response.error)
          !!errorCallback && errorCallback(getErrorType(response.error.status));
      });
  }

  async function downloadVotingQrCode({scorecardUuid, successCallback,  errorCallback}) {
    const response = await scorecardApi.getQrCode(scorecardUuid);
    handleApiResponse(response, async (responseData) => {
      let filename = _getImageFilename(scorecardUuid);
      const isImageExist = await isFileExist(filename);
      if (isImageExist)
        successCallback && successCallback();
      else {
        const backendUrl = await settingHelper.getSavedEndpointUrl()
        downloadFileFromUrl(`${backendUrl}${responseData.qr_code_url}`, filename, true,
          (isSuccess, downloadResponse, localFilePath) => {
            if (isSuccess) {
              Scorecard.update(scorecardUuid, {
                voting_qr: localFilePath,
                voting_url: responseData.voting_url
              });
              successCallback && successCallback({ qr_code: localFilePath, voting_url: responseData.voting_url });
            }
            else {
              errorCallback && errorCallback(downloadResponse);
            }
          }
        );
      }
    }, (error) => {
      !!errorCallback && errorCallback();
    });
  }

  async function getVotingStats({scorecardUuid, successCallback}) {
    const response = await scorecardApi.getStats(scorecardUuid);
    console.log('=== scorecard stat response = ', response);
    handleApiResponse(response, async (responseData) => {
      successCallback(responseData);
    })
  }

  function _getImageFilename(scorecardUuid) {
    return `${scorecardUuid}_qr_code.png`;
  }
})();

export default onlineScorecardSubmissionService;
