import AsyncStorage from '@react-native-async-storage/async-storage';
import validationService from './validation_service';
import lockDeviceService from './lock_device_service';
import { FAILED_SIGN_IN_ATTEMPT } from '../constants/lock_device_constant';

const authenticationFormService = (() => {
  return {
    isValidForm,
    setIsErrorAuthentication,
    clearErrorAuthentication,
    isAuthenticated,
    isValidSettingForm,
  };

  function isValidForm(email, password) {
    let emailValidationMsg = _getEmailValidationMsg(email);
    let passwordValidationMsg = _getPasswordValidationMsg(password);

    return emailValidationMsg === null && passwordValidationMsg === null;
  }

  async function isAuthenticated() {
    let settings = await AsyncStorage.getItem('SETTING');
    settings = JSON.parse(settings);
    
    if (settings == null || settings.email == null || settings.password == null)
      return false;

    const isError = await AsyncStorage.getItem('IS_ERROR_AUTHENTICATION');
    return !isError ? true : false;
  }

  function setIsErrorAuthentication() {
    AsyncStorage.setItem('IS_ERROR_AUTHENTICATION', 'true');
  }

  function clearErrorAuthentication() {
    AsyncStorage.removeItem('IS_ERROR_AUTHENTICATION');
  }

  async function isValidSettingForm(backendUrl, email, password) {
    if (await lockDeviceService.isLocked(FAILED_SIGN_IN_ATTEMPT))
      return false;

    const backendUrlValidationMsg = validationService('backendUrl', backendUrl == '' ? undefined : backendUrl);
    const emailValidationMsg = _getEmailValidationMsg(email);
    const passwordValidationMsg = _getPasswordValidationMsg(password);
    let isValidForm = true;

    if (backendUrlValidationMsg != null || emailValidationMsg != null || passwordValidationMsg != null)
      isValidForm =  false;

    return isValidForm;
  }

  // private methods
  function _getEmailValidationMsg(email) {
    return validationService('email', email === '' ? undefined : email);
  }

  function _getPasswordValidationMsg(password) {
    return validationService('password', password === '' ? undefined : password);
  }
})();

export default authenticationFormService;