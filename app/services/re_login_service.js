import AsyncStorage from '@react-native-community/async-storage';

const keyName = 'HAS_RE_LOGGED_IN';

const reLoginService = (() => {
  return {
    isReLoggedIn,
    isRequireReLogin,
    initReLoginStatus,
    setHasReLoggedIn,
    clearHasReLoggedIn,
  }

  async function isReLoggedIn() {
    const hasReLoggedIn = await AsyncStorage.getItem(keyName);
    return !!hasReLoggedIn ? JSON.parse(hasReLoggedIn) : false;
  }

  // To do: Remove the update endpoint in the future
  // If the user has re-login state as false, show the re-login alert message
  async function isRequireReLogin() {
    return !await isReLoggedIn();
  }

  async function initReLoginStatus() {
    AsyncStorage.setItem(keyName, JSON.stringify(await isReLoggedIn()));
  }

  function setHasReLoggedIn() {
    AsyncStorage.setItem(keyName, 'true');
  }

  function clearHasReLoggedIn() {
    AsyncStorage.removeItem(keyName);
  }
})();

export default reLoginService;