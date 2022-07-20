import BaseApi from './BaseApi';
import urlUtil from '../utils/url_util';

class ContactApi extends BaseApi {
  constructor() {
    super('contacts', '');
  }

  load = async (successCallback, failedCallback) => {
    const options = {
      method: 'GET',
      cancelToken: this.cancelTokenSource.token,
    };

    const relativeUrl = '/api/v1/' + this.responsibleModel;
    const url = await urlUtil.getAbsoluteUrl(relativeUrl);
    return BaseApi.sendRequest(url, options, 'json', successCallback, failedCallback);
  }
}

export default ContactApi;
