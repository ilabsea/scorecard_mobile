import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const qs = require('qs');

class BaseApi {
  static request = async (options) => {
    try {
      const response = await axios({
        method: options.method,
        url: options.url,
        data: options.data || undefined,
        params: options.params || undefined,
        responseType: options.responseType || 'json',
        paramsSerializer: function(params) {
          return qs.stringify(params, {arrayFormat: 'brackets'})
        },
        headers: await BaseApi.getHeader(),
      });

      return response;
    } catch(error) {
      throw error
    }
  }

  static getHeader = async () => {
    const authToken = await AsyncStorage.getItem('AUTH_TOKEN');

    let authorization = '';
    if (authToken)
      authorization = authToken;

    return {
      Accept: 'applcation/json',
      'Content-Type': 'application/json',
      Authorization: authorization,
    }
  }
}

export default BaseApi;