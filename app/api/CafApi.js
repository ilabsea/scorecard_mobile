import BaseApi from './BaseApi';

class CafApi extends BaseApi {
  constructor() {
    super('local_ngos', 'cafs');
  }
}

export default CafApi;