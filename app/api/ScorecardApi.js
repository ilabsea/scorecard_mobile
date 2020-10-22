import BaseApi from './BaseApi';

const ScorecardApi = {
  getDetail: (code) => {
    const options = {
      url: '/api/v1/scorecards/' + code,
      method: 'GET',
    };

    return BaseApi.request(options);
  }
}

export default ScorecardApi;