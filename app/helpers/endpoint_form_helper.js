import AsyncStorage from '@react-native-community/async-storage';

const keyName = 'HAS_NEW_ENDPOINT_ADDED';

const endpointFormHelper = (() => {
  return {
    hasDiscardAlert,
    setHasNewEndpointAdded,
    hasNewEndpointAdded,
    clearHasNewEndpointAdded,
  }

  function hasDiscardAlert(inputLabel, inputUrl, selectedEndpoint) {
    if (!inputLabel && !inputUrl)
      return false;
  
    return !!selectedEndpoint && (selectedEndpoint.label == inputLabel && selectedEndpoint.value == inputUrl) ? false : true;
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