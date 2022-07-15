import RNFetchBlob from 'react-native-fetch-blob';
import FormDataApi from './FormDataApi';
import customIndicatorHelper from '../helpers/custom_indicator_helper';
import { getErrorType } from '../services/api_service';

const CustomIndicatorApi = (() => {
  return {
    post
  };

  function post(scorecardUuid, indicator, successCallback, errorCallback) {
    const customIndicatorData = customIndicatorHelper.getCustomIndicatorData(indicator);
    let params = [{ name: 'custom_indicator', data: JSON.stringify(customIndicatorData['custom_indicator']) }];

    if (!!customIndicatorData.audio)
      params.push({ name: 'audio', filename: 'audio.mp3', type: 'audio/mp3', data: RNFetchBlob.wrap(customIndicatorData.audio) });

    const endpoint = `/api/v1/scorecards/${scorecardUuid}/custom_indicators`;
    FormDataApi.post(endpoint, params, (response) => {
      !!successCallback && successCallback(response);
    }, (error) => errorCallback(getErrorType(error.status)))
  }
})();

export default CustomIndicatorApi;
