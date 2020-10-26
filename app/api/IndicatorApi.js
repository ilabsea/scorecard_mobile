import BaseApi from './BaseApi';

const IndicatorApi = {
  load: (categoryId) => {
    const options = {
      url: '/api/v1/categories/' + categoryId + '/indicators',
      method: 'GET',
    };

    return BaseApi.request(options);
  }
}

export default IndicatorApi;