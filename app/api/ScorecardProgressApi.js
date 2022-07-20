import BaseApi from './BaseApi';
import urlUtil from '../utils/url_util';

const ScorecardProgressApi = {
  post: async (data, successCallback, failedCallback) => {
    const options = {
      method: 'POST',
      data: data,
    };

    const url = await urlUtil.getAbsoluteUrl('/api/v1/scorecard_progresses');
    return BaseApi.sendRequest(url, options, 'json', successCallback, failedCallback);
  }
}

export default ScorecardProgressApi;