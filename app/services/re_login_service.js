import AsyncStorage from '@react-native-async-storage/async-storage';

const keyName = 'HAS_RE_LOGGED_IN';

const reLoginService = (() => {
  return {
    isReLoggedIn,
    isRequireReLogin,
    initReLoginStatus,
    setReLoggedIn,
  }

  async function isReLoggedIn() {
    const reLoggedIn = await AsyncStorage.getItem(keyName);
    return !!reLoggedIn ? JSON.parse(reLoggedIn) : false;
  }

  // To do: Remove the update endpoint in the future
  // If the user has re-login state as false, show the re-login alert message
  async function isRequireReLogin() {
    return !await isReLoggedIn();
  }

  async function initReLoginStatus() {
    AsyncStorage.setItem(keyName, JSON.stringify(await isReLoggedIn()));
  }

  function setReLoggedIn(status) {
    AsyncStorage.setItem(keyName, status.toString());
  }
})();

export default reLoginService;