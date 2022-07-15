import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import { getErrorObject } from '../utils/api_error_util';

import authenticationHelper from '../helpers/authentication_helper';
import authenticationService from '../services/authentication_service';
import { handleApiResponse } from '../services/api_service';

const qs = require('qs');

class BaseApi {
  constructor(responsibleModel, subModel) {
    this.responsibleModel = responsibleModel;
    this.subModel = subModel;
    this.cancelTokenSource = axios.CancelToken.source();
  }

  load = (id, successCallback, failedCallback) => {
    const options = {
      url: '/api/v1/' + this.responsibleModel + '/' + id + '/' + this.subModel,
      method: 'GET',
      cancelToken: this.cancelTokenSource.token,
    };

    BaseApi.sendingRequest(options, null, successCallback, failedCallback);
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

  static sendingRequest = async (options, endpoint = null, successCallback, failedCallback) => {
    const isTokenExpired = await authenticationHelper.isTokenExpired();
    console.log('+ baseApi token is expired = ', isTokenExpired);
    if (isTokenExpired) {
      authenticationService.reNewAuthToken(() => {
        BaseApi.handleRequest(options, endpoint, successCallback, failedCallback);
      });
      return;
    }

    BaseApi.handleRequest(options, endpoint, successCallback, failedCallback);
  }

  static handleRequest(options, endpoint, successCallback, failedCallback) {
    BaseApi.request(options, endpoint).then((response) => {
      handleApiResponse(response, (responseData) => {
        !!successCallback && successCallback(responseData);
      }, (error) => {
        !!failedCallback && failedCallback(error);
      });
    })
  }
}

export default BaseApi;
