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
    let endpointUrls = JSON.parse(await AsyncStorage.getItem('ENDPOINT_URLS')) || defaultEndpointUrls;
    const defaultEndpoint = JSON.parse(await AsyncStorage.getItem('SETTING')).backendUrl;

    if (!!defaultEndpoint)
      endpointUrls = endpointUrls.filter(endpointUrl => endpointUrl.type != DEFAULT && endpointUrl.value != defaultEndpoint)

    if (!!defaultEndpoint && !EndpointUrl.isExist('', defaultEndpoint))
      endpointUrls.push({ label: 'Local Development Server', value: defaultEndpoint, type: CUSTOM });

    endpointUrls.map(endpointUrl => {
      if (!EndpointUrl.isExist(endpointUrl.label, endpointUrl.value))
        EndpointUrl.create({ label: endpointUrl.label, value: endpointUrl.value, type: !!endpointUrl.type ? endpointUrl.type : DEFAULT });
    });
  }
})();

export default endpointMigrationService;