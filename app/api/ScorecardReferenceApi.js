import BaseApi from './BaseApi';

class ScorecardReferenceApi extends BaseApi {
  constructor() {
    super('scorecards', 'scorecard_references');
  }

  post = (id, data) => {
    const options = {
      url: '/api/v1/' + this.responsibleModel + '/' + id + '/' + this.subModel,
      method: 'POST',
      data: data,
    };

    return BaseApi.request(options, null, true);
  }
}

export default ScorecardReferenceApi;