import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseApi from './BaseApi';
import { environment } from '../config/environment';

class ContactApi extends BaseApi {
  constructor() {
    super('contacts', '');
  }

  load = async () => {
    const options = {
      url: '/api/v1/' + this.responsibleModel,
      method: 'GET',
      cancelToken: this.cancelTokenSource.token,
    };

    let endpoint = await AsyncStorage.getItem('ENDPOINT_URL') || environment.domain;

    return BaseApi.request(options, endpoint);
  }
}

export default ContactApi;
