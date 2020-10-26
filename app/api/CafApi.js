import BaseApi from './BaseApi';

const CafApi = {
  load: (localNgoId) => {
    const options = {
      url: '/api/v1/local_ngos/' + localNgoId + '/cafs',
      method: 'GET',
    };

    return BaseApi.request(options);
  },
};

export default CafApi;
