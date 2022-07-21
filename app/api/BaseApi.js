import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import { getErrorObject } from '../utils/api_error_util';
import urlUtil from '../utils/url_util';
import authenticationHelper from '../helpers/authentication_helper';
import authenticationService from '../services/authentication_service';
import { handleApiResponse } from '../services/api_service';
import { ERROR_SOMETHING_WENT_WRONG } from '../constants/error_constant';

const qs = require('qs');

class BaseApi {
  constructor(responsibleModel, subModel = '') {
    this.responsibleModel = responsibleModel;
    this.subModel = subModel;
    this.cancelTokenSource = axios.CancelToken.source();
  }

  listingUrl = () => {
    return '/api/v1/' + this.responsibleModel;
  }

  listingObjectUrl = (id) => {
    if (!id)
      return null;

    return `/api/v1/${this.responsibleModel}/${id}`;
  }

  listingNestedObjectUrl = (id) => {
    if (!id || !this.subModel)
      return null;

    const subUrl = `/${id}/${this.subModel}`;
    return urlUtil.concat(this.listingUrl(), subUrl);
  }

  load = async (id, successCallback, failedCallback) => {
    const options = {
      method: 'GET',
      cancelToken: this.cancelTokenSource.token,
    };

    const url = await urlUtil.getAbsoluteUrl(this.listingNestedObjectUrl(id));
    this.sendRequest(url, options, 'json', successCallback, failedCallback);
  }

  cancelRequest = () => {
    this.cancelTokenSource.cancel();
  }

  request = async (url, options, token = null, contentType = 'json') => {
    if (!url)
      return;

    try {
      const response = await axios({
        method: options.method,
        url: url,
        data: options.data || undefined,
        params: options.params || undefined,
        responseType: contentType,
        paramsSerializer: function(params) {
          return qs.stringify(params, {arrayFormat: 'brackets'})
        },
        headers: this.generateAuthorizationHeader(token),
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

  generateAuthorizationHeader = (token) => {
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

  sendRequest = async (url, options, contentType = 'json', successCallback, failedCallback) => {
    if (!url) {
      failedCallback({ status: ERROR_SOMETHING_WENT_WRONG });
      return;
    }
    const token = await BaseApi.authenticate();

    this.request(url, options, token, contentType).then((response) => {
      handleApiResponse(response, (responseData) => {
        !!successCallback && successCallback(responseData);
      }, (error) => {
        !!failedCallback && failedCallback(error);
      });
    })
  }
}

export default BaseApi;
