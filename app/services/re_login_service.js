import AsyncStorage from '@react-native-community/async-storage';

const keyName = 'HAS_RE_LOGGED_IN';

const reLoginService = (() => {
  return {
    isRequireReLogin,
    initReLoginStatus,
    setHasReLoggedIn,
    clearHasReLoggedIn,
  }

  // To do: Remove the update endpoint in the future
  // If the user has re-login state as false, show the re-login alert message
  async function isRequireReLogin() {
    return !await _hasReLoggedIn();
  }

  async function initReLoginStatus() {
    const hasReLoggedIn = await _hasReLoggedIn();
    AsyncStorage.setItem(keyName, JSON.stringify(hasReLoggedIn));
  }

  function setHasReLoggedIn() {
    AsyncStorage.setItem(keyName, 'true');
  }

  function clearHasReLoggedIn() {
    AsyncStorage.removeItem(keyName);
  }

  // private method
  async function _hasReLoggedIn() {
    const hasReLoggedIn = await AsyncStorage.getItem(keyName);
    return !!hasReLoggedIn ? JSON.parse(hasReLoggedIn) : false;
  }
})();

export default reLoginService;