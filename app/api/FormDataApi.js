import RNFetchBlob from 'react-native-fetch-blob'
import { handleApiResponse } from '../services/api_service';
import BaseApi from './BaseApi';

const formDataApi = (() => {
  return {
    post
  }

  async function post(url, params, contentType = 'multipart/form-data', successCallback, failedCallback){
    const token = await BaseApi.authenticate();

    RNFetchBlob.fetch('POST', url, {
      Authorization: `Token ${ token }`,
      'Content-Type': contentType,
    }, params).then((response) => {
      handleApiResponse(response, (res) => {
        !!successCallback && successCallback(res);
      }, (error) => {
        !!failedCallback && failedCallback(getErrorType(error.status));
      });
    })
  }
})();

export default formDataApi;