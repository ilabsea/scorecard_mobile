import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import { getErrorObject } from '../utils/api_error_util';

import authenticationHelper from '../helpers/authentication_helper';
import authenticationService from '../services/authentication_service';
import { handleApiResponse } from '../services/api_service';
import { environment } from '../config/environment';

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

    BaseApi.sendRequest(options, successCallback, failedCallback);
  }

  cancelRequest = () => {
    this.cancelTokenSource.cancel();
  }

  static request = async (options, token = '') => {
    const endpointUrl = await AsyncStorage.getItem('ENDPOINT_URL') || environment.domain;
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
        headers: BaseApi.getHeader(token),
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

  static getHeader = (token) => {
    let authorization = '';
    if (token)
      authorization = token;

    return {
      Accept: 'application/json',
      Authorization: `Token ${authorization}`,
    };
  }

  static authenticate = async () => {
    const isTokenExpired = await authenticationHelper.isTokenExpired();
    if (!isTokenExpired) {
      const token = await AsyncStorage.getItem('AUTH_TOKEN');
      return token;
    }

    const token = await authenticationService.reAuthenticate();
    return token;
  }

  static sendRequest = async (options, successCallback, failedCallback) => {
    const token = await BaseApi.authenticate();

    BaseApi.request(options, token).then((response) => {
      handleApiResponse(response, (responseData) => {
        !!successCallback && successCallback(responseData);
      }, (error) => {
        !!failedCallback && failedCallback(error);
      });
    })
  }
}

export default BaseApi;
