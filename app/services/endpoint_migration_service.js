import AsyncStorage from '@react-native-community/async-storage';
import { defaultEndpointUrls } from '../constants/url_constant';
import endpointFormService from './endpoint_form_service';

const endpointMigrationService = (() => {
  return {
    handleEndpointMigration
  }

  // If the endpoint from previous version if not exist, add the endpoint to the list item with the label "Local Development Server"
  async function handleEndpointMigration() {
    let endpointUrls = JSON.parse(await AsyncStorage.getItem('ENDPOINT_URLS')) || defaultEndpointUrls;
    const defaultEndpoint = JSON.parse(await AsyncStorage.getItem('SETTING')).backendUrl;

    if (defaultEndpoint && !endpointFormService.isEndpointExisted('', defaultEndpoint, endpointUrls)) {
      endpointUrls.push({ label: 'Local Development Server', value: defaultEndpoint });
      AsyncStorage.setItem('ENDPOINT_URLS', JSON.stringify(endpointUrls));
    }
  }
})();

export default endpointMigrationService;