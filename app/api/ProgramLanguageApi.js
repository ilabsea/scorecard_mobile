import BaseApi from './BaseApi';

class ProgramLanguageApi extends BaseApi {
  constructor() {
    super('programs', 'languages');
  }
}

export default ProgramLanguageApi;
