import AsyncStorage from '@react-native-community/async-storage';
import BaseApi from './BaseApi';
import { environment } from '../config/environment';

class ContactApi extends BaseApi {
  constructor() {
    super('contacts', '');
  }

  load = async (successCallback, failedCallback) => {
    const options = {
      url: '/api/v1/' + this.responsibleModel,
      method: 'GET',
      cancelToken: this.cancelTokenSource.token,
    };

    const endpoint = await AsyncStorage.getItem('ENDPOINT_URL') || environment.domain;
    return BaseApi.sendRequest(options, endpoint, successCallback, failedCallback);
  }
}

export default ContactApi;
