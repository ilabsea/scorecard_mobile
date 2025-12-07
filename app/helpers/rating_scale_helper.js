import LanguageRatingScale from '../models/LanguageRatingScale';

const ratingScaleHelper = (() => {
  return {
    getRatingScaleLabel
  }

  function getRatingScaleLabel(ratingLabel, translations, scorecard) {
    const ratingLanguage = _getLanguageRatingScale(ratingLabel, translations, scorecard);
    return ratingLanguage.content
  }

  function _findLanguageRatingScale(ratingCode, languageCode, programId) {
    const languageRatingScales = JSON.parse(JSON.stringify(LanguageRatingScale.findByProgramId(programId)))

    return languageRatingScales.filter(rating =>
      rating.rating_scale_code == ratingCode && rating.language_code == languageCode
    )[0];
  }

  function _getLanguageRatingScale(ratingCode, translations, scorecard) {
    let rating = _findLanguageRatingScale(ratingCode, scorecard.audio_language_code, scorecard.program_id) || {};

    if (!scorecard.isSameLanguageCode) {
      let textRating = _findLanguageRatingScale(ratingCode, scorecard.text_language_code, scorecard.program_id);
      rating.content = !!textRating && textRating.content;
    }

    rating.content = rating.content || translations[ratingCode];

    return rating;
  }
})();

export default ratingScaleHelper;