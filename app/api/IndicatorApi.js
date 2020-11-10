import BaseApi from './BaseApi';

class IndicatorApi extends BaseApi {
  constructor() {
    super('facilities', 'indicators');
  }
}

export default IndicatorApi;