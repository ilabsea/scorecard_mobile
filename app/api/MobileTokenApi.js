import BaseApi from './BaseApi';
import urlUtil from '../utils/url_util';

class MobileTokenApi extends BaseApi {
  constructor() {
    super('mobile_tokens');
  }

  put = async (data, successCallback) => {
    const options = {
      method: 'PUT',
      data: data,
    };

    const url = await urlUtil.getAbsoluteUrl(this.listingUrl());
    this.sendRequest(url, options, 'json', successCallback);
  }
}

export default MobileTokenApi;
