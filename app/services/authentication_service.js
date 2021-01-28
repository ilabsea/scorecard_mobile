import SessionApi from '../api/SessionApi';
import { handleApiResponse } from './api_service';
import validationService from './validation_service';
import AsyncStorage from '@react-native-community/async-storage';

const authenticationService = (() => {
  return {
    authenticate,
    isValidForm,
    setIsErrorAuthentication,
    checkErrorAuthentication,
    clearErrorAuthentication,
  };

  async function authenticate(email, password, successCallback, failedCallback) {
    const response = await SessionApi.authenticate(email, password);
    handleApiResponse(response, (res) => {
      successCallback(res);
    }, (error) => {
      failedCallback(error);
    });
  }

  function isValidForm(email, password) {
    let emailValidationMsg = validationService('email', email === '' ? undefined : email);
    let passwordValidationMsg = validationService('password', password === '' ? undefined : password);

    return emailValidationMsg === null && passwordValidationMsg === null;
  }

  function setIsErrorAuthentication() {
    AsyncStorage.setItem('IS_ERROR_AUTHENTICATION', 'true');
  }

  async function checkErrorAuthentication(callback) {
    const isError = await AsyncStorage.getItem('IS_ERROR_AUTHENTICATION');

    if (isError)
      callback();
  }

  function clearErrorAuthentication() {
    AsyncStorage.removeItem('IS_ERROR_AUTHENTICATION');
  }
})();

export default authenticationService;