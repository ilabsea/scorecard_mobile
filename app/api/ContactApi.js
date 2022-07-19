import BaseApi from './BaseApi';

class ContactApi extends BaseApi {
  constructor() {
    super('contacts', '');
  }

  load = (successCallback, failedCallback) => {
    const options = {
      url: '/api/v1/' + this.responsibleModel,
      method: 'GET',
      cancelToken: this.cancelTokenSource.token,
    };

    return BaseApi.sendRequest(options, successCallback, failedCallback);
  }
}

export default ContactApi;
