import BaseApi from './BaseApi';

class MobileTokenApi extends BaseApi {
  constructor() {
    super('mobile_tokens', '');
  }

  put = (data, successCallback) => {
    const options = {
      url: '/api/v1/' + this.responsibleModel,
      method: 'PUT',
      data: data,
    };

    BaseApi.sendRequest(options, successCallback);
  }
}

export default MobileTokenApi;
