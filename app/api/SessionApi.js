import BaseApi from './BaseApi';
import urlUtil from '../utils/url_util';

class SessionApi extends BaseApi {
  constructor() {
    super('sign_in');
  }

  authenticate = async (username, password) => {
    const options = {
      method: 'POST',
      params: {
        user: {
          email: username,
          password: password,
        },
      },
    };

    const token = null;
    const url = await urlUtil.getAbsoluteUrl(this.listingUrl());
    return this.request(url, options, token, 'json');
  }
}

export default SessionApi;
