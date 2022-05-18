import AsyncStorage from '@react-native-community/async-storage';

const keyName = 'HAS_INSTALLED';

const appStatusService = (() => {
  return {
    handleAppInstallingStatus,
    isAppFirstTimeInstalled,
  }

  async function handleAppInstallingStatus() {
    AsyncStorage.setItem(keyName, 'true');
  }

  async function isAppFirstTimeInstalled() {
    const hasInstalled = await AsyncStorage.getItem(keyName);
    return !hasInstalled;
  }
})();

export default appStatusService;