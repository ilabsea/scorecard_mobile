import BaseApi from './BaseApi';

const ScorecardProgressApi = {
  post: (data) => {
    const options = {
      url: '/api/v1/scorecard_progresses',
      method: 'POST',
      data: data,
    };

    return BaseApi.request(options);
  }
}

export default ScorecardProgressApi;