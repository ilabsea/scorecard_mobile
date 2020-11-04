import BaseApi from './BaseApi';

class IndicatorApi extends BaseApi {
  constructor() {
    super('categories', 'indicators');
  }
}

export default IndicatorApi;