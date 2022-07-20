import BaseApi from './BaseApi';
import urlUtil from '../utils/url_util';

class ContactApi extends BaseApi {
  constructor() {
    super('contacts');
  }

  load = async (successCallback, failedCallback) => {
    const options = {
      method: 'GET',
      cancelToken: this.cancelTokenSource.token,
    };

    const url = await urlUtil.getAbsoluteUrl(this.listingUrl());
    return this.sendRequest(url, options, 'json', successCallback, failedCallback);
  }
}

export default ContactApi;
