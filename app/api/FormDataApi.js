import RNFetchBlob from 'react-native-fetch-blob'
import AsyncStorage from '@react-native-community/async-storage';
import { handleApiResponse } from '../services/api_service';
import BaseApi from './BaseApi';

const formDataApi = (() => {
  return {
    post
  }

  async function post(endpoint, params, successCallback, failedCallback){
    const domain = await AsyncStorage.getItem('ENDPOINT_URL');
    const apiUrl = domain + endpoint;

    BaseApi.checkAndRenewAuthToken(() => {
      _sendPostRequest(apiUrl, params, successCallback, failedCallback)
    });
  }

  // private method
  async function _sendPostRequest(apiUrl, params, successCallback, failedCallback) {
    const authToken = await AsyncStorage.getItem('AUTH_TOKEN');

    RNFetchBlob.fetch('POST', apiUrl, {
      Authorization: `Token ${ authToken }`,
      'Content-Type': 'multipart/form-data',
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