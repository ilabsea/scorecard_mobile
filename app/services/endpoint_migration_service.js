import AsyncStorage from '@react-native-community/async-storage';
import { defaultEndpointUrls } from '../constants/url_constant';
import { CUSTOM, DEFAULT } from '../constants/main_constant';
import EndpointUrl from '../models/EndpointUrl';

const endpointMigrationService = (() => {
  return {
    handleEndpointMigration
  }

  // If the endpoint from previous version if not exist, add the endpoint to the list item with the label "Local Development Server"
  async function handleEndpointMigration() {
    let endpointUrls = await _getSavedEnpointUrls();
    const defaultEndpoint = JSON.parse(await AsyncStorage.getItem('SETTING')).backendUrl;

    if (_isAbleToCreateCustomEndpoint(defaultEndpoint))
      endpointUrls.push({ label: 'Local  Development Server', value: defaultEndpoint, type: CUSTOM });

    // Check if there is a custom endpoint with the URL the same as default endpoint URL (staging, production), remove it from realm
    _handleRemoveInvalidCustomEndpoint();

    endpointUrls.map(endpointUrl => {
      if (!EndpointUrl.isExist(endpointUrl.label, endpointUrl.value))
        EndpointUrl.create({ label: endpointUrl.label, value: endpointUrl.value, type: !!endpointUrl.type ? endpointUrl.type : DEFAULT });
    });
  }

  // private method
  async function _getSavedEnpointUrls() {
    let endpointUrls = JSON.parse(await AsyncStorage.getItem('ENDPOINT_URLS')) || [];
    if (endpointUrls.length > 0) {
      defaultEndpointUrls.map(defaultEndpointUrl => {
        endpointUrls = endpointUrls.filter(endpointUrl => endpointUrl.value != defaultEndpointUrl.value);
      })
    }

    return [...defaultEndpointUrls, ...endpointUrls];
  }

  function _isAbleToCreateCustomEndpoint(defaultEndpoint) {
    return !!defaultEndpoint && !EndpointUrl.isExist('', defaultEndpoint) && !_isDefaultEndpointUrl(defaultEndpoint);
  }

  function _isDefaultEndpointUrl(endpoint) {
    return defaultEndpointUrls.filter(defaultEndpointUrl => defaultEndpointUrl.value === endpoint).length > 0;
  }

  function _handleRemoveInvalidCustomEndpoint() {
    const customEndpointUrls = EndpointUrl.getAllCustomEndpointUrls();
    customEndpointUrls.map(customEndpointUrl => {
      if (!!customEndpointUrl && _isDefaultEndpointUrl(customEndpointUrl.value)) {
        EndpointUrl.destroy(customEndpointUrl.uuid);
      }
    });
  }
})();

export default endpointMigrationService;