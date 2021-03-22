import SessionApi from '../api/SessionApi';
import { handleApiResponse } from './api_service';
import authenticationFormService from './authentication_form_service';
import AsyncStorage from '@react-native-community/async-storage';

const authenticationService = (() => {
  return {
    authenticate,
    reNewAuthToken,
  };

  async function authenticate(email, password, successCallback, failedCallback) {
    const response = await SessionApi.authenticate(email, password);
    handleApiResponse(response, (res) => {
      successCallback(res);
      authenticationFormService.clearErrorAuthentication();
    }, (error) => {
      failedCallback(error);
    });
  }

  async function reNewAuthToken(callback) {
    const setting = await AsyncStorage.getItem('SETTING');
    const { email, password } = JSON.parse(setting);

    authenticate(email, password, (responseData) => {
      AsyncStorage.setItem('TOKEN_EXPIRED_DATE', responseData.token_expired_date);
      AsyncStorage.setItem('AUTH_TOKEN', responseData.authentication_token);
      authenticationFormService.clearErrorAuthentication();
      callback();
    }, (error) => {
      AsyncStorage.removeItem('AUTH_TOKEN');
      authenticationFormService.setIsErrorAuthentication();
    });
  }
})();

export default authenticationService;