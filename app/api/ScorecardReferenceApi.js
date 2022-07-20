import BaseApi from './BaseApi';
import urlUtil from '../utils/url_util';

class ScorecardReferenceApi extends BaseApi {
  constructor() {
    super('scorecards', 'scorecard_references');
  }

  post = async (id, data, successCallback, failedCallback) => {
    const options = {
      method: 'POST',
      data: data,
    };

    const url = await urlUtil.getAbsoluteUrl(this.listingObjectUrl(id));
    return this.sendRequest(url, options, 'json', successCallback, failedCallback);
  }
}

export default ScorecardReferenceApi;