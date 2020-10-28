import BaseApi from './BaseApi';

const ProgramLanguageApi = {
  load: (programId) => {
    const options = {
      url: '/api/v1/programs/' + programId + '/languages',
      method: 'GET',
    };

    return BaseApi.request(options);
  },
};

export default ProgramLanguageApi;
