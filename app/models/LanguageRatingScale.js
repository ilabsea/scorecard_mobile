import realm from '../db/schema';

const MODEL = 'LanguageRatingScale';

const LanguageRatingScale = (() => {
  return {
    findByProgramId
  }

  function findByProgramId(programId) {
    return realm.objects(MODEL).filtered(`program_id == ${programId}`);
  }
})();

export default LanguageRatingScale;