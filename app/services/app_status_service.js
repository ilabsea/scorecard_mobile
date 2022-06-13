import AsyncStorage from '@react-native-community/async-storage';
import reLoginService from './re_login_service';
import settingHelper from '../helpers/setting_helper';
import pkg from '../../package';

const appStatusService = (() => {
  return {
    handleAppInstallingStatus,
  }

  // Check if the app version 1.5.2 is freshly installed, do not show the alert message
  async function handleAppInstallingStatus() {
    if (pkg.version == '1.5.7' && !await settingHelper.getFullyEndpointUrl()) {
      reLoginService.setHasReLoggedIn();
      AsyncStorage.setItem('FIRST_TIME_LAUNCH', 'false');
    }
    else if (pkg.version == '1.5.7' && await isFirstTimeLaunch()) {
      reLoginService.clearHasReLoggedIn();
      AsyncStorage.setItem('FIRST_TIME_LAUNCH', 'false');
    }
  }

  // private method
  async function isFirstTimeLaunch() {
    const isFirstTimeLaunch = await AsyncStorage.getItem('FIRST_TIME_LAUNCH');
    return !!isFirstTimeLaunch ? JSON.parse(isFirstTimeLaunch) : true;
  }
})();

export default appStatusService;