import BaseApi from './BaseApi';
import urlUtil from '../utils/url_util';

class MobileTokenApi extends BaseApi {
  constructor() {
    super('mobile_tokens', '');
  }

  put = async (data, successCallback) => {
    const options = {
      method: 'PUT',
      data: data,
    };

    const relativeUrl = '/api/v1/' + this.responsibleModel;
    const url = await urlUtil.getAbsoluteUrl(relativeUrl);
    BaseApi.sendRequest(url, options, 'json', successCallback);
  }
}

export default MobileTokenApi;
