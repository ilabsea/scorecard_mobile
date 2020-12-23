import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

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

  static request = async (options) => {
    const endpointUrl = await AsyncStorage.getItem('ENDPOINT_URL');
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
        return {error: res.toJSON().message};
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
      Accept: 'applcation/json',
      Authorization: authorization,
    };
  }
}

export default BaseApi;
