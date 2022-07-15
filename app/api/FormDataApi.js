import RNFetchBlob from 'react-native-fetch-blob'
import AsyncStorage from '@react-native-community/async-storage';
import { handleApiResponse } from '../services/api_service';
import authenticationService from '../services/authentication_service';
import authenticationHelper from '../helpers/authentication_helper';

const formDataApi = (() => {
  return {
    post
  }

  async function post(endpoint, params, successCallback, failedCallback){
    const domain = await AsyncStorage.getItem('ENDPOINT_URL');
    const apiUrl = domain + endpoint;

    _sendingRequest(apiUrl, params, successCallback, failedCallback);
  }

  // async function post(endpoint, params){
  //   const domain = await AsyncStorage.getItem('ENDPOINT_URL');
  //   const authToken = await AsyncStorage.getItem('AUTH_TOKEN');
  //   const apiUrl = domain + endpoint;

  //   return RNFetchBlob.fetch('POST', apiUrl, {
  //           Authorization: `Token ${ authToken }`,
  //           'Content-Type': 'multipart/form-data',
  //         }, params);
  // }

  // private method
  async function _sendingRequest(apiUrl, params, successCallback, failedCallback) {
    const isTokenExpired = await authenticationHelper.isTokenExpired();
    console.log('+ form data api token is expired = ', isTokenExpired);
    if (isTokenExpired) {
      authenticationService.reNewAuthToken(() => {
        _sendPostRequest(apiUrl, params, successCallback, failedCallback)
      });
      return;
    }

    _sendPostRequest(apiUrl, params, successCallback, failedCallback)
  }

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