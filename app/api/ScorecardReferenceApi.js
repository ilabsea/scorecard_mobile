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

    const relativeUrl = '/api/v1/' + this.responsibleModel + '/' + id + '/' + this.subModel;
    const url = await urlUtil.getAbsoluteUrl(relativeUrl);
    return BaseApi.sendRequest(url, options, 'json', successCallback, failedCallback);
  }
}

export default ScorecardReferenceApi;