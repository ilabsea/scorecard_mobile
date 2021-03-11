import AsyncStorage from '@react-native-community/async-storage';

import { ERROR_AUTHENTICATION, ERROR_ENDPOINT } from '../constants/error_constant';
import authenticationHelper from '../helpers/authentication_helper';
import authenticationService from './authentication_service';

const checkConnection = (callback) => {
  setTimeout(async function () {
    let message = '';
    let type = '';
    let isConnected = await AsyncStorage.getItem('IS_CONNECTED');
    isConnected = JSON.parse(isConnected);

    if (!isConnected) {
      message = 'lowInternetConnectionMsg';
      type = 'error';
    }

    callback(type, message);
  }, 20000);
};

const handleApiResponse = (response, successCallback, errorCallback) => {
  if (response.error != undefined)
    errorCallback(response.error);
  else
    successCallback(response.data);
}

const getErrorType = (errorStatus) => {
  if (errorStatus == 422 || errorStatus == 401)
    return ERROR_AUTHENTICATION;

  return ERROR_ENDPOINT;
}

const sendRequestToApi = async (apiRequest) => {
  const isTokenExpired = await authenticationHelper.isTokenExpired();
  if (isTokenExpired) {
    authenticationService.reNewAuthToken(() => {
      apiRequest();
    });
    return;
  }

  apiRequest();
}


export {checkConnection, handleApiResponse, getErrorType, sendRequestToApi};