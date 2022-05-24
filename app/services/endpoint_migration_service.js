import AsyncStorage from '@react-native-community/async-storage';
import { defaultEndpointUrls } from '../constants/url_constant';
import { CUSTOM, DEFAULT } from '../constants/main_constant';
import EndpointUrl from '../models/EndpointUrl';
import endpointUrlHelper from '../helpers/endpoint_url_helper';

const endpointMigrationService = (() => {
  return {
    handleEndpointMigration
  }

  // If the endpoint from previous version if not exist, add the endpoint to the list item with the label "Local Development Server"
  async function handleEndpointMigration() {
    let endpointUrls = await _getSavedEnpointUrls();
    const defaultEndpoint = JSON.parse(await AsyncStorage.getItem('SETTING')).backendUrl;

    if (_isAbleToCreateCustomEndpoint(defaultEndpoint))
      endpointUrls.push({ label: 'Local Development Server', value: defaultEndpoint, type: CUSTOM });

    // Check if there is a custom endpoint with the URL the same as default endpoint URL (staging, production), remove it from realm
    _handleCustomEndpoint();

    endpointUrls.map(endpointUrl => {
      // if (!EndpointUrl.isExist(endpointUrl.label, endpointUrl.value))
      //   EndpointUrl.create({ label: endpointUrl.label, value: endpointUrl.value, type: !!endpointUrl.type ? endpointUrl.type : DEFAULT });

      const savedEndpointUrl = EndpointUrl.findByUrlValue(endpointUrl.value);

      if (!savedEndpointUrl)
        EndpointUrl.create({ label: endpointUrl.label, value: endpointUrl.value, type: !!endpointUrl.type ? endpointUrl.type : DEFAULT });
      else if (!savedEndpointUrl.shortcut) {
        // add shortcut data, username, password to existing endpoint url
        const params = endpointUrlHelper.generateShortcutData(endpointUrl.value)
        EndpointUrl.update(savedEndpointUrl.uuid, params);
      }
    });
  }

  // private method

  // Return endpoint urls from constant and AsyncStorage (for migration from app version < 1.5.0)
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

  function _handleCustomEndpoint() {
    const customEndpointUrls = EndpointUrl.getAllCustomEndpointUrls();
    customEndpointUrls.map(async customEndpointUrl => {
      if (!!customEndpointUrl && _isDefaultEndpointUrl(customEndpointUrl.value))
        EndpointUrl.destroy(customEndpointUrl.uuid);
      else if (!customEndpointUrl.shortcut) {
        // add shortcut data to existing custom endpoint url
        const params = endpointUrlHelper.generateShortcutData(customEndpointUrl.value)
        const accountInfo = await endpointUrlHelper.getEndpointAccountInfo(customEndpointUrl.value);
        EndpointUrl.update(customEndpointUrl.uuid, {...params, ...accountInfo});
      }
    });
  }
})();

export default endpointMigrationService;