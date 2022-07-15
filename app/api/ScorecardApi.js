import BaseApi from './BaseApi';

class ScorecardApi extends BaseApi {
  constructor() {
    super('scorecards', '');
  }

  put = (id, data, successCallback, failedCallback) => {
    const options = {
      url: '/api/v1/' + this.responsibleModel + '/' + id,
      method: 'PUT',
      data: data,
    };

    return BaseApi.sendRequest(options, null, successCallback, failedCallback);
  }
}

export default ScorecardApi;
