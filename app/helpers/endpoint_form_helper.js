import AsyncStorage from '@react-native-community/async-storage';

const keyName = 'SHOW_ENDPOINT_BOTTOM_SHEET';

const endpointFormHelper = (() => {
  return {
    hasDiscardAlert,
    setShowEndpointBottomSheetStatus,
    shouldShowEndpointBottomSheet,
    clearShowEndpointBottomSheetStatus,
  }

  function hasDiscardAlert(inputLabel, inputUrl, selectedEndpoint) {
    if (!inputLabel && !inputUrl)
      return false;
  
    return !!selectedEndpoint && (selectedEndpoint.label == inputLabel && selectedEndpoint.value == inputUrl) ? false : true;
  }

  function setShowEndpointBottomSheetStatus() {
    AsyncStorage.setItem(keyName, 'true');
  }

  async function shouldShowEndpointBottomSheet() {
    const status = JSON.parse(await AsyncStorage.getItem(keyName));
    return !!status
  }

  function clearShowEndpointBottomSheetStatus() {
    AsyncStorage.removeItem(keyName);
  }
})();

export default endpointFormHelper;