import SessionApi from '../api/SessionApi';
import { handleApiResponse } from './api_service';
import authenticationFormService from './authentication_form_service';

const authenticationService = (() => {
  return {
    authenticate,
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
})();

export default authenticationService;