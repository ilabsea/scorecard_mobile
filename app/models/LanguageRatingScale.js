import realm from '../db/schema';

const MODEL = 'LanguageRatingScale';

const LanguageRatingScale = (() => {
  return {
    findByProgramId,
    findByLanguageCodeAndRatingScaleId,
  }

  function findByProgramId(programId) {
    return realm.objects(MODEL).filtered(`program_id == ${programId}`);
  }

  function findByLanguageCodeAndRatingScaleId(languageCode, ratingScaleId) {
    return realm.objects(MODEL).filtered(`language_code = '${languageCode}' AND rating_scale_id = ${ratingScaleId}`)[0];
  }
})();

export default LanguageRatingScale;