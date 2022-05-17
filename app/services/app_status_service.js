import AsyncStorage from '@react-native-community/async-storage';
import scorecardEndpointService from './scorecard_endpoint_service';

const keyName = 'HAS_INSTALLED';
const appOpenKeyName = 'IS_FIRST_TIME_APP_OPEN';

const appInstallingService = (() => {
  return {
    handleAppInstallingStatus,
    isAppFirstTimeInstalled,
    setIsNotFirstTimeAppOpen,
    isFirstTimeAppOpen,
  }

  async function handleAppInstallingStatus() {
    // if the app is first time installed (not from updating) and app version is 1.5.2, do not show the alert message
    if (await isAppFirstTimeInstalled() && scorecardEndpointService.isAppVersionForUpdateScorecard())
      setIsNotFirstTimeAppOpen();

    AsyncStorage.setItem(keyName, 'true');
  }

  async function isAppFirstTimeInstalled() {
    const hasInstalled = await AsyncStorage.getItem(keyName);
    return !hasInstalled;
  }

  function setIsNotFirstTimeAppOpen() {
    AsyncStorage.setItem(appOpenKeyName, 'false');
  }

  async function isFirstTimeAppOpen() {
    const isFirstTimeOpen = await AsyncStorage.getItem(appOpenKeyName);
    return isFirstTimeOpen == null && isFirstTimeOpen == undefined;
  }
})();

export default appInstallingService;