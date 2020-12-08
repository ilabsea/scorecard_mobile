import BaseApi from './BaseApi';

const SessionApi = {
  authenticate: (username, password) => {
    const options = {
      url: '/api/v1/sign_in',
      method: 'POST',
      params: {
        user: {
          email: username,
          password: password,
        },
      },
    };

    return BaseApi.request(options);
  },
};

export default SessionApi;
