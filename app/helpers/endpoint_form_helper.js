import AsyncStorage from '@react-native-community/async-storage';

const keyName = 'NEW_ENDPOINT_ADDED';

const endpointFormHelper = (() => {
  return {
    setNewEndpointAdded,
    newEndpointAdded,
  }

  function setNewEndpointAdded(status) {
    AsyncStorage.setItem(keyName, status.toString());
  }

  async function newEndpointAdded() {
    const endpointAdded = await AsyncStorage.getItem(keyName);
    return !!endpointAdded ? JSON.parse(endpointAdded) : false;
  }
})();

export default endpointFormHelper;