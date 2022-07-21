import BaseApi from './BaseApi';
import urlUtil from '../utils/url_util';

class ScorecardApi extends BaseApi {
  constructor() {
    super('scorecards');
  }

  put = async (id, data, successCallback, failedCallback) => {
    const options = {
      method: 'PUT',
      data: data,
    };

    const url = await urlUtil.getAbsoluteUrl(this.listingObjectUrl(id));
    return this.sendRequest(url, options, 'json', successCallback, failedCallback);
  }
}

export default ScorecardApi;
