import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { getErrorObject } from '../utils/api_error_util';

const qs = require('qs');

class BaseApi {
  constructor(responsibleModel, subModel) {
    this.responsibleModel = responsibleModel;
    this.subModel = subModel;
    this.cancelTokenSource = axios.CancelToken.source();
  }

  load = (id) => {
    const options = {
      url: '/api/v1/' + this.responsibleModel + '/' + id + '/' + this.subModel,
      method: 'GET',
      cancelToken: this.cancelTokenSource.token,
    };

    return BaseApi.request(options);
  }

  cancelRequest = () => {
    this.cancelTokenSource.cancel();
  }

  static request = async (options, endpoint) => {
    const endpointUrl = endpoint || await AsyncStorage.getItem('ENDPOINT_URL');
    const apiUrl = endpointUrl + options.url;

    try {
      const response = await axios({
        method: options.method,
        url: apiUrl,
        data: options.data || undefined,
        params: options.params || undefined,
        responseType: options.responseType || 'json',
        paramsSerializer: function(params) {
          return qs.stringify(params, {arrayFormat: 'brackets'})
        },
        headers: await BaseApi.getHeader(),
        cancelToken: options.cancelToken || undefined,
      })
      .catch((res) => {
        const error = getErrorObject(res);
        return {error: error};
      })

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
      Accept: 'application/json',
      Authorization: `Token ${authorization}`,
    };
  }
}

export default BaseApi;
