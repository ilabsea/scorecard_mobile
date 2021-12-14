import BaseApi from './BaseApi';
import AsyncStorage from '@react-native-community/async-storage';
import { environment } from '../config/environment';

class MobileTokenApi extends BaseApi {
  constructor() {
    super('mobile_tokens', '');
  }

  put = async (data) => {
    const options = {
      url: '/api/v1/' + this.responsibleModel,
      method: 'PUT',
      data: data,
    };

    const endpointUrl = await AsyncStorage.getItem('ENDPOINT_URL') || environment.domain;

    return BaseApi.request(options, endpointUrl);
  }
}

export default MobileTokenApi;
