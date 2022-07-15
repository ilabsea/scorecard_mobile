import BaseApi from './BaseApi';

class ScorecardReferenceApi extends BaseApi {
  constructor() {
    super('scorecards', 'scorecard_references');
  }

  post = (id, data, successCallback, failedCallback) => {
    const options = {
      url: '/api/v1/' + this.responsibleModel + '/' + id + '/' + this.subModel,
      method: 'POST',
      data: data,
    };

    return BaseApi.sendRequest(options, null, successCallback, failedCallback);
  }
}

export default ScorecardReferenceApi;