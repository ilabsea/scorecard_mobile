import BaseApi from './BaseApi';
import urlUtil from '../utils/url_util';

class ScorecardProgressApi extends BaseApi {
  constructor() {
    super('scorecard_progresses');
  }

  post = async (data, successCallback, failedCallback) => {
    const options = {
      method: 'POST',
      data: data,
    };

    const url = await urlUtil.getAbsoluteUrl(this.listingUrl());
    return this.sendRequest(url, options, 'json', successCallback, failedCallback);
  }
}

export default ScorecardProgressApi;