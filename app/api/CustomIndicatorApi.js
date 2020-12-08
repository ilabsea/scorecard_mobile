import BaseApi from './BaseApi';

class CustomIndicatorApi extends BaseApi {
  constructor() {
    super('scorecards', 'custom_indicators');
  }

  post = (id, data) => {
    const options = {
      url: '/api/v1/' + this.responsibleModel + '/' + id + '/' + this.subModel,
      method: 'POST',
      data: data,
    };

    return BaseApi.request(options);
  }
}

export default CustomIndicatorApi;
