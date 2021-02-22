import AsyncStorage from '@react-native-community/async-storage';
import validationService from './validation_service';

const authenticationFormService = (() => {
  return {
    isValidForm,
    setIsErrorAuthentication,
    clearErrorAuthentication,
    isAuthenticated,
  };

  function isValidForm(email, password) {
    let emailValidationMsg = validationService('email', email === '' ? undefined : email);
    let passwordValidationMsg = validationService('password', password === '' ? undefined : password);

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
})();

export default authenticationFormService;