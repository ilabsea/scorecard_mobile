import SessionApi from '../api/SessionApi';
import { handleApiResponse } from './api_service';
import validationService from './validation_service';

const authenticationService = (() => {
  return {
    authenticate,
    isValidForm,
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
})();

export default authenticationService;