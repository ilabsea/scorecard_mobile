import AsyncStorage from '@react-native-community/async-storage';

import { ERROR_AUTHENTICATION, ERROR_ENDPOINT, ERROR_NOT_FOUND, ERROR_UNAUTHORIZED, ERROR_UNPROCESSABLE } from '../constants/error_constant';
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
  switch (parseInt(errorStatus)) {
    case 422:
      return ERROR_UNPROCESSABLE;
    case 401:
      return ERROR_AUTHENTICATION;
    case 404:
      return ERROR_NOT_FOUND;
    case 403:
      return ERROR_UNAUTHORIZED;
    default:
      return ERROR_ENDPOINT;
  }
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