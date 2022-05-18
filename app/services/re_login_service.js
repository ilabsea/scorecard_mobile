import AsyncStorage from '@react-native-community/async-storage';
import pkg from '../../package';
import settingHelper from '../helpers/setting_helper';
import Scorecard from '../models/Scorecard';
import appStatusService from '../services/app_status_service';

const keyName = 'HAS_RE_LOGGED_IN';

const reLoginService = (() => {
  return {
    isAppVersionForUpdateScorecard,
    isRequireReLogin,
    initReLoginStatus,
    setHasReLoggedIn,
  }

  // To do: Remove the update endpoint in the future
  // When updating the app to version 1.5.2, user requires to update the reauthenicate in
  // in setting screen to update the endpoint_url of the scorecard that has null on that field
  // because when updating the app from previous version to 1.5.2, some scorecard will have
  // endpoint_url as null or ''
  function isAppVersionForUpdateScorecard() {
    return pkg.version == '1.5.2'
  }

  async function isRequireReLogin() {
    // If the app v 1.5.2 is first time installed (not from updating), do not show the alert message
    if (await appStatusService.isAppFirstTimeInstalled())
      return false;

    return isAppVersionForUpdateScorecard() && !await _hasReLoggedIn();
  }

  async function initReLoginStatus() {
    const hasReLoggedIn = await _hasReLoggedIn();
    AsyncStorage.setItem(keyName, JSON.stringify(hasReLoggedIn));
  }

  function setHasReLoggedIn() {
    AsyncStorage.setItem(keyName, 'true');
  }

  // private method
  async function _hasReLoggedIn() {
    const hasReLoggedIn = await AsyncStorage.getItem(keyName);
    return !!hasReLoggedIn ? JSON.parse(hasReLoggedIn) : false;
  }
})();

export default reLoginService;