import BaseApi from './BaseApi';

class ScorecardApi extends BaseApi {
  constructor() {
    super('scorecards', '');
  }

  put = (id, data) => {
    const options = {
      url: '/api/v1/' + this.responsibleModel + '/' + id,
      method: 'PUT',
      data: data,
    };

    return BaseApi.request(options);
  }
}

export default ScorecardApi;
