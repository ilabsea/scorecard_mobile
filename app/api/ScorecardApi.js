import BaseApi from './BaseApi';
import urlUtil from '../utils/url_util';

class ScorecardApi extends BaseApi {
  constructor() {
    super('scorecards', '');
  }

  put = async (id, data, successCallback, failedCallback) => {
    const options = {
      method: 'PUT',
      data: data,
    };

    const relativeUrl = '/api/v1/' + this.responsibleModel + '/' + id;
    const url = await urlUtil.getAbsoluteUrl(relativeUrl);
    return BaseApi.sendRequest(url, options, 'json', successCallback, failedCallback);
  }
}

export default ScorecardApi;
