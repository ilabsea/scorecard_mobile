import BaseApi from './BaseApi';

class ContactApi extends BaseApi {
  constructor() {
    super('contacts', '');
  }

  load = (id) => {
    const options = {
      url: '/api/v1/' + this.responsibleModel,
      method: 'GET',
      cancelToken: this.cancelTokenSource.token,
    };

    return BaseApi.request(options);
  }
}

export default ContactApi;
