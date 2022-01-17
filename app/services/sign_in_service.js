import AsyncStorage from '@react-native-community/async-storage';

import { handleApiResponse, getErrorType } from './api_service';
import authenticationFormService from './authentication_form_service';
import contactService from './contact_service';
import MobileTokenService from './mobile_token_service';
import lockDeviceService from './lock_device_service';
import resetLockService from './reset_lock_service';
import SessionApi from '../api/SessionApi';
import { ERROR_UNPROCESSABLE } from '../constants/error_constant';
import { FAILED_SIGN_IN_ATTEMPT } from '../constants/lock_device_constant';

const signInService = (() => {
  return {
    saveSignInInfo,
    authenticate
  }

  function saveSignInInfo(state) {
    const { backendUrl, email, password, locale } = state;

    AsyncStorage.setItem('ENDPOINT_URL', backendUrl);
    AsyncStorage.setItem('SETTING', JSON.stringify({
      backendUrl: backendUrl,
      email: email,
      password: password,
      locale: locale
    }));
  }

  async function authenticate(email, password, successCallback, errorCallback) {
    const response = await SessionApi.authenticate(email, password);

    handleApiResponse(response, (responseData) => {
      resetLockService.resetLockData(FAILED_SIGN_IN_ATTEMPT);
      AsyncStorage.setItem('IS_CONNECTED', 'true');
      AsyncStorage.setItem('AUTH_TOKEN', responseData.authentication_token);
      AsyncStorage.setItem('TOKEN_EXPIRED_DATE', responseData.token_expired_date);
      MobileTokenService.updateToken(responseData.program_id);

      authenticationFormService.clearErrorAuthentication();
      contactService.downloadContacts(null, null);
      successCallback();
    }, (error) => {
      let isInvalidAccount = false;

      if (getErrorType(error.status) === ERROR_UNPROCESSABLE) {
        authenticationFormService.setIsErrorAuthentication();
        lockDeviceService.countInvalidRequest(FAILED_SIGN_IN_ATTEMPT);
        isInvalidAccount = true;
      }

      AsyncStorage.setItem('IS_CONNECTED', 'true');
      AsyncStorage.removeItem('AUTH_TOKEN');

      setTimeout(async () => {
        const isLocked = await lockDeviceService.isLocked(FAILED_SIGN_IN_ATTEMPT);
        errorCallback(_getAuthenticationErrorMsg(response), isLocked, isInvalidAccount);
      }, 200);
    });
  }

  // private methods
  function _getAuthenticationErrorMsg(response) {
    if (response.error === undefined)
      return 'authenticationFailed';

    let message = '';
    const error = response.error;

    if (error.message.toLowerCase() === 'invalid email or password!')
      message = 'invalidEmailOrPasswordMsg';
    else if (error.message.toLowerCase() === 'your account is unprocessable')
      message = 'accountIsUnprocessable';
    else if (error.message.toLowerCase() === 'network error' || error.status === 511)
      message = 'theServerUrlIsInvalid';
    else
      message = 'authenticationFailed';

    return message;
  }
})();

export default signInService;