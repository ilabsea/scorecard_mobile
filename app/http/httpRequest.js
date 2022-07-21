import axios from 'axios';
import RNFetchBlob from 'react-native-fetch-blob';
import RNFS from 'react-native-fs';

import { getErrorObject } from '../utils/api_error_util';
import { handleApiResponse, getErrorType } from '../services/api_service';
import { ERROR_SOMETHING_WENT_WRONG } from '../constants/error_constant';
import { getAudioPath, getPDFPath } from '../utils/file_util';

const qs = require('qs');

const httpRequest = (() => {
  return {
    send,
    sendFormData,
    downloadFile,
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

  async function sendFormData(url, params, token, contentType = 'multipart/form-data', successCallback, failedCallback) {
    if (!url) {
      failedCallback({status: ERROR_SOMETHING_WENT_WRONG});
      return;
    }

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

  async function downloadFile(url, token, filename, isPdfFile, callback) {
    let background = false;
    let destinationPath = isPdfFile ? getPDFPath(filename) : getAudioPath(filename);
    let options = {
      fromUrl: url,
      toFile: destinationPath,
      background,
    };

    if (isPdfFile)
      options['headers'] = generateAuthorizationHeader(token);

    await RNFS.downloadFile(options).promise.then(res => {
      const isSuccess = res.statusCode == 200 ? true : false;
      callback(isSuccess, res, options.toFile);
    }).catch(err => callback(false, err));
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