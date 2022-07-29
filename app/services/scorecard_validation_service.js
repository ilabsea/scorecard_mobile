import Scorecard from '../models/Scorecard';
import newScorecardService from './new_scorecard_service';
import authenticationFormService from './authentication_form_service';
import lockDeviceService from './lock_device_service';
import resetLockService from './reset_lock_service';
import { INVALID_SCORECARD_ATTEMPT } from '../constants/lock_device_constant';

import { navigate } from '../navigators/app_navigator';

const scorecardValidationService = (() => {
  return {
    validateScorecardCode
  }

  function validateScorecardCode(code, setErrorState, updateInfoModalState) {
    return _checkDeviceLock(code, setErrorState, updateInfoModalState);
  }

  // private methods
  // Check if the device is locked
  async function _checkDeviceLock(code, setErrorState, updateInfoModalState) {
    if (await lockDeviceService.isLocked(INVALID_SCORECARD_ATTEMPT))
      return false;

    return _checkAuthentication(code, setErrorState, updateInfoModalState)
  }

  // Check if the user is authenticated
  async function _checkAuthentication(code, setErrorState, updateInfoModalState) {
    const isAuthenticated = await authenticationFormService.isAuthenticated();
    if (!isAuthenticated) {
      setErrorState('401');
      return false;
    }

    return _checkMatchedEndpoint(code, updateInfoModalState);
  }

  // Check if the scorecard has mismatch endpoint
  async function _checkMatchedEndpoint(code, updateInfoModalState) {
    if (Scorecard.isExists(code) && !await Scorecard.hasMatchedEndpointUrl(code)) {
      updateInfoModalState(true, false, false);
      return false;
    }

    return _checkSubmitted(code, updateInfoModalState);
  }

  // Check if the scorecard is already submitted
  function _checkSubmitted(code, updateInfoModalState) {
    const isSubmitted = Scorecard.isSubmitted(code);

    if (!newScorecardService.isValidScorecard(code) || isSubmitted) {
      if (isSubmitted)
        resetLockService.resetLockData(INVALID_SCORECARD_ATTEMPT);

      updateInfoModalState(isSubmitted, isSubmitted, true);
      return false;
    }

    return _checkScorecardExisted(code, updateInfoModalState);
  }

  // Check if the scorecard is already existed in the current device
  function _checkScorecardExisted(code, updateInfoModalState) {
    if (Scorecard.isExists(code)) {
      resetLockService.resetLockData(INVALID_SCORECARD_ATTEMPT);

      newScorecardService.handleExistedScorecard(code, () => {
        navigate('ScorecardDetail', { scorecard_uuid: code });
      }, () => {
        updateInfoModalState(true, false, true);
      });

      return false;
    }

    return true;
  }
})();

export default scorecardValidationService;