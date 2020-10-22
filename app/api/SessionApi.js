import BaseApi from './BaseApi';

const SessionApi = {
  authenticate: (backendUrl, username, password) => {
    const options = {
      url: backendUrl,
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