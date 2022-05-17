import AsyncStorage from '@react-native-community/async-storage';
import pkg from '../../package';

const requiredVersion = '1.5.2';

const scorecardEndpointService = (() => {
  return {
    isRequireToUpdateScorecardEndpoint,
    setIsNotFirstTimeAppOpen,
  }

  // To do: Remove the update endpoint in the future
  // When updating the app to version 1.5.2, user requires to update the re-authenicate in
  // in setting screen to update the endpoint_url of the scorecard that has null on that field
  // because when updating the app from previous versoin to 1.5.2, some scorecard will have
  // endpoint_url as null or ''
  async function isRequireToUpdateScorecardEndpoint() {
    return pkg.version == requiredVersion && await _isFirstTimeAppOpen()
  }

  function setIsNotFirstTimeAppOpen() {
    AsyncStorage.setItem('IS_FIRST_TIME_APP_OPEN', 'false');
  }

  // private method
  async function _isFirstTimeAppOpen() {
    const isFirstTimeOpen = await AsyncStorage.getItem('IS_FIRST_TIME_APP_OPEN');
    return isFirstTimeOpen == null && isFirstTimeOpen == undefined;
    // return true;
  }
})();

export default scorecardEndpointService;