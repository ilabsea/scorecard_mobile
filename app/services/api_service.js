import AsyncStorage from '@react-native-community/async-storage';

import { ERROR_AUTHENTICATION, ERROR_ENDPOINT, ERROR_INTERNET } from '../constants/error_constant';

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

const getErrorType = (error) => {
  if (error != null && (error.indexOf('422') != -1 || error.indexOf('401') != -1))
    return ERROR_AUTHENTICATION;
  else if (error !=null && error.indexOf(ERROR_INTERNET) != -1)
    return ERROR_INTERNET;

  return ERROR_ENDPOINT;
}


export {checkConnection, handleApiResponse, getErrorType};