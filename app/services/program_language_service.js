import realm from '../db/schema';
import uuidv4 from '../utils/uuidv4';
import { handleApiResponse } from './api_service';

import ProgramLanguageApi from '../api/ProgramLanguageApi';
import { programLanguagePhase } from '../constants/scorecard_constant';

import { isPhaseDownloaded } from './scorecard_download_service';

const save = async (scorecardUuid, programId, successCallback, errorCallback) => {
  if (isPhaseDownloaded(scorecardUuid, programLanguagePhase)) {
    successCallback(true, programLanguagePhase);
    return;
  }

  let savedCount = 0;
  const programLanguageApi = new ProgramLanguageApi();
  const response = await programLanguageApi.load(programId);
  handleApiResponse(response, (languages) => {
    languages.map((language) => {
      if (!_isExist(language.id, programId)) {
        const attrs = {
          uuid: uuidv4(),
          id: language.id,
          name: language.name,
          code: language.code,
          program_id: programId,
        };

        realm.write(() => {
          realm.create('ProgramLanguage', attrs);
        });
      }
      savedCount += 1;
    });

    successCallback(savedCount === languages.length, programLanguagePhase);
  }, (error) => {
    console.log('error download program language = ', error);
    errorCallback();
  });
};

const _isExist = (id, programId) => {
  const programLanguage = realm.objects('ProgramLanguage').filtered(`id == ${id} AND program_id = ${programId}`)[0];
  return programLanguage === undefined ? false : true;
}

const getAll = (programId) => {
  return realm.objects('ProgramLanguage').filtered(`program_id = ${programId}`);
}

export { save, getAll };