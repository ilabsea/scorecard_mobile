import BaseApi from './BaseApi';

const ScorecardProgressApi = {
  post: (data, successCallback, failedCallback) => {
    const options = {
      url: '/api/v1/scorecard_progresses',
      method: 'POST',
      data: data,
    };

    return BaseApi.sendRequest(options, null, successCallback, failedCallback);
  }
}

export default ScorecardProgressApi;