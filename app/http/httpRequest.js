import axios from 'axios';
import RNFetchBlob from 'react-native-fetch-blob'

import BaseApi from '../api/BaseApi';
import { getErrorObject } from '../utils/api_error_util';
import { handleApiResponse, getErrorType } from '../services/api_service';
import { ERROR_SOMETHING_WENT_WRONG } from '../constants/error_constant';

const qs = require('qs');

const httpRequest = (() => {
  return {
    send,
    sendFormData,
  }

  async function send(url, options, token = null, contentType = 'json') {
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
        headers: generateAuthorizationHeader(token),
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

  async function sendFormData(url, params, contentType = 'multipart/form-data', successCallback, failedCallback) {
    if (!url) {
      failedCallback({status: ERROR_SOMETHING_WENT_WRONG});
      return;
    }
    const token = await BaseApi.authenticate();

    RNFetchBlob.fetch('POST', url, {
      Authorization: `Token ${ token }`,
      'Content-Type': contentType,
    }, params).then((response) => {
      handleApiResponse(response, (res) => {
        !!successCallback && successCallback(res);
      }, (error) => {
        !!failedCallback && failedCallback(getErrorType(error.status));
      });
    })
  }

  // private method
  function generateAuthorizationHeader(token) {
    let authorization = '';
    if (token)
      authorization = token;

    return {
      Accept: 'application/json',
      Authorization: `Token ${authorization}`,
    };
  }
})();

export default httpRequest;