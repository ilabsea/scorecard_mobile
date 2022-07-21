import RNFetchBlob from 'react-native-fetch-blob';
import BaseApi from './BaseApi';
import customIndicatorHelper from '../helpers/custom_indicator_helper';
import { getErrorType } from '../services/api_service';
import urlUtil from '../utils/url_util';
import httpRequest from '../http/httpRequest';

const CustomIndicatorApi = (() => {
  return {
    post
  };

  async function post(scorecardUuid, indicator, successCallback, errorCallback) {
    const customIndicatorData = customIndicatorHelper.getCustomIndicatorData(indicator);
    let params = [{ name: 'custom_indicator', data: JSON.stringify(customIndicatorData['custom_indicator']) }];

    if (!!customIndicatorData.audio)
      params.push({ name: 'audio', filename: 'audio.mp3', type: 'audio/mp3', data: RNFetchBlob.wrap(customIndicatorData.audio) });

    const baseApi = new BaseApi('scorecards', 'custom_indicators');
    const url = await urlUtil.getAbsoluteUrl(baseApi.listingNestedObjectUrl(scorecardUuid));
    const token = await BaseApi.authenticate();

    httpRequest.sendFormData(url, params, token, 'multipart/form-data', (response) => {
      !!successCallback && successCallback(response);
    }, (error) => errorCallback(getErrorType(error.status)))
  }
})();

export default CustomIndicatorApi;
