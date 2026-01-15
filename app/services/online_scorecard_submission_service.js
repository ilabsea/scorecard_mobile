import Scorecard from '../models/Scorecard';
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