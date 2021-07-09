import BaseApi from './BaseApi';
import { environment } from '../config/environment';

class MobileTokenApi extends BaseApi {
  constructor() {
    super('mobile_tokens', '');
  }

  put = (data) => {
    const options = {
      url: '/api/v1/' + this.responsibleModel,
      method: 'PUT',
      data: data,
    };

    return BaseApi.request(options, environment.domain);
  }
}

export default MobileTokenApi;
