import AsyncStorage from '@react-native-community/async-storage';

const keyName = 'HAS_NEW_ENDPOINT_ADDED';

const endpointFormHelper = (() => {
  return {
    setHasNewEndpointAdded,
    hasNewEndpointAdded,
    clearHasNewEndpointAdded,
  }

  function setHasNewEndpointAdded() {
    AsyncStorage.setItem(keyName, 'true');
  }

  async function hasNewEndpointAdded() {
    const status = JSON.parse(await AsyncStorage.getItem(keyName));
    return !!status
  }

  function clearHasNewEndpointAdded() {
    AsyncStorage.removeItem(keyName);
  }
})();

export default endpointFormHelper;