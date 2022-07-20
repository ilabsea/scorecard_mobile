import BaseApi from './BaseApi';
import urlUtil from '../utils/url_util';

const SessionApi = {
  authenticate: async (username, password) => {
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
    const url = await urlUtil.getAbsoluteUrl('/api/v1/sign_in');
    return BaseApi.request(url, options, token, 'json');
  },
};

export default SessionApi;
