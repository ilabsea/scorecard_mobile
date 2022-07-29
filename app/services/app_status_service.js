import AsyncStorage from '@react-native-community/async-storage';
import reLoginService from './re_login_service';
import settingHelper from '../helpers/setting_helper';
import pkg from '../../package';
import { TOKEN_SYNCED, TOKEN_REGISTERED } from '../constants/main_constant';
import MobileTokenService from './mobile_token_service';

const appStatusService = (() => {
  return {
    handleAppInstallingStatus,
    checkAppVersionSyncStatus,
  }

  // Check if the app version 1.5.2 is freshly installed, do not show the alert message
  async function handleAppInstallingStatus() {
    if (!await settingHelper.hasFullyEndpointUrl())
      reLoginService.setReLoggedIn(true);
    else if (pkg.version == '1.5.7' && await isFirstTimeLaunch())
      reLoginService.setReLoggedIn(false);

    AsyncStorage.setItem('FIRST_TIME_LAUNCH', 'false');
  }

  function checkAppVersionSyncStatus() {
    AsyncStorage.getItem(TOKEN_REGISTERED, async(error, attrs) => {
      const jsonValue = JSON.parse(attrs);
      if (!jsonValue || await isFirstTimeLaunch() || jsonValue.app_version != pkg.version)
        AsyncStorage.removeItem(TOKEN_SYNCED);

      MobileTokenService.handleSyncingToken();
    });
  }

  // private method
  async function isFirstTimeLaunch() {
    const isFirstTimeLaunch = await AsyncStorage.getItem('FIRST_TIME_LAUNCH');
    return !!isFirstTimeLaunch ? JSON.parse(isFirstTimeLaunch) : true;
  }
})();

export default appStatusService;