import realm from '../db/schema';
import uuidv4 from '../utils/uuidv4';

import ProgramLanguageApi from '../api/ProgramLanguageApi';
import ProgramLanguage from '../models/ProgramLanguage';

const load = (programId, successCallback, errorCallback) => {
  if (!ProgramLanguage.isExist(programId)) {
    _sendRequestAndSave(programId, () => {
      successCallback();
    }, (error) => {
      errorCallback(error);
    });
  }
  else
    successCallback();
}

const _sendRequestAndSave = async (programId, callback) => {
  if (ProgramLanguage.isExist(programId))
    return;

  new ProgramLanguageApi().load(programId, (languages) => {
    languages.map((language) => {
      if (!_isExist(language.id, programId)) {
        const attrs = {
          uuid: uuidv4(),
          id: language.id,
          name_en: language.name_en,
          name_km: language.name_km,
          code: language.code,
          program_id: programId,
        };

        ProgramLanguage.create(attrs);
      }
    });

    callback(languages);
  }, (error) => callback(error));
};

const _isExist = (id, programId) => {
  const programLanguage = realm.objects('ProgramLanguage').filtered(`id == ${id} AND program_id = ${programId}`)[0];
  return programLanguage === undefined ? false : true;
}

export { load };