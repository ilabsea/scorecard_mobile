import AsyncStorage from '@react-native-community/async-storage';
import SessionApi from '../api/SessionApi';
import { handleApiResponse, getErrorType } from './api_service';
import authenticationFormService from './authentication_form_service';
import contactService from './contact_service';
import MobileTokenService from './mobile_token_service';
import lockDeviceService from './lock_device_service';
import resetLockService from './reset_lock_service';
import { ERROR_UNPROCESSABLE } from '../constants/error_constant';
import { FAILED_SIGN_IN_ATTEMPT } from '../constants/lock_device_constant';
import settingHelper from '../helpers/setting_helper';

const authenticationService = (() => {
  return {
    authenticate,
    reAuthenticate,
    saveSignInInfo,
  };

  async function authenticate(email, password, successCallback, errorCallback) {
    const response = await SessionApi.authenticate(email, password);

    handleApiResponse(response, (responseData) => {
      if (!!responseData.authentication_token) {
        resetLockService.resetLockData(FAILED_SIGN_IN_ATTEMPT);
        AsyncStorage.setItem('IS_CONNECTED', 'true');
        AsyncStorage.setItem('AUTH_TOKEN', responseData.authentication_token);
        AsyncStorage.setItem('TOKEN_EXPIRED_DATE', responseData.token_expired_date);
        MobileTokenService.updateToken(responseData.program_id);

        authenticationFormService.clearErrorAuthentication();
        contactService.downloadContacts(null, null);
        successCallback(responseData);
      }
      else
        errorCallback('theServerUrlIsInvalid', false, false)
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

  async function reAuthenticate() {
    const setting = await AsyncStorage.getItem('SETTING');
    const { email, password } = JSON.parse(setting);
    const response = await SessionApi.authenticate(email, password);
    let token = '';

    handleApiResponse(response, (responseData) => {
      if (!!responseData.authentication_token) {
        AsyncStorage.setItem('AUTH_TOKEN', responseData.authentication_token);
        AsyncStorage.setItem('TOKEN_EXPIRED_DATE', responseData.token_expired_date);
        token = responseData.authentication_token;
      }
    }, (error) => AsyncStorage.removeItem('AUTH_TOKEN'));

    return token;
  }

  async function saveSignInInfo(state) {
    const { backendUrl, email, password } = state;

    if (!!backendUrl) AsyncStorage.setItem('ENDPOINT_URL', backendUrl);
    AsyncStorage.setItem('SETTING', JSON.stringify({
      backendUrl: backendUrl,
      email: email,
      password: password,
      proposedIndicatorMethod: await settingHelper.getSelectedProposedIndicatorMethodName(),
    }));
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

export default authenticationService;