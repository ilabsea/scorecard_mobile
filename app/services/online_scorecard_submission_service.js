import Scorecard from '../models/Scorecard';
import { scorecardAttributes } from '../utils/scorecard_attributes_util';
import { getErrorType, handleApiResponse } from './api_service';
import {
  downloadFileFromUrl,
  isFileExist,
} from './local_file_system_service';
import ScorecardApi from '../api/ScorecardApi';

const scorecardApi = new ScorecardApi();

const onlineScorecardSubmissionService = (() => {
  return {
    draftSubmit,
    downloadVotingQrCode,
  }

  async function draftSubmit({scorecardUuid, successCallback, errorCallback}) {
    const scorecard = Scorecard.find(scorecardUuid);
    let attrs = await scorecardAttributes(scorecard);
    scorecardApi.put(scorecardUuid, attrs)
      .then(function (response) {
        if (response.status == 200)
          successCallback();
        else if (response.error)
          !!errorCallback && errorCallback(getErrorType(response.error.status));
      });
  }

  async function downloadVotingQrCode({scorecardUuid, successCallback,  errorCallback}) {
    const response = await scorecardApi.getQrCode(scorecardUuid);
    console.log('=== QR code API response = ', response);

    handleApiResponse(response, async (responseData) => {
      console.log('=== qr code success response = ', responseData);
      // Todo: 1. download the QR Code image
      // 2. Store the image url in the Scorecard schema
      // 3. Read the scorecard image url when the user revisit the screen
      // 4. Add a button to download the QR code, in case it was failed to download in the frist place

      let filename = _getImageFilename(scorecardUuid);
      const isImageExist = await isFileExist(filename);
      if (isImageExist)
        successCallback && successCallback();
      else {
        const settingData = await settingHelper.getSettingData();
        downloadFileFromUrl(`${settingData.backendUrl}${responseData.qr_code_url}`, filename, true,
          (isSuccess, downloadResponse, localFilePath) => {
            if (isSuccess) {
              Scorecard.update(scorecardUuid, {
                voting_qr: localFilePath,
                voting_url: responseData.voting_url
              });
              successCallback && successCallback(localFilePath);
            }
            else {
              console.log('== Error download QR code image = ', downloadResponse);
              errorCallback && errorCallback(downloadResponse);
            }
          }
        );
      }
    }, (error) => {
      console.log('== error QR code api = ', error);
      !!errorCallback && errorCallback();
    });
  }

  function _getImageFilename(scorecardUuid) {
    return `${scorecardUuid}_qr_code.png`;
  }
})();

export default onlineScorecardSubmissionService;