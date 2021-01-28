// Download phases of scorecard contain indicator, language_indicator, caf,
// rating_scale, program_language, lang_indicator_audio, lang_rating_scale_audio, and indicator_image
const scorecardDownloadSteps = 8;

const programLanguagePhase = 1;
const cafPhase = 2;
const ratingScalePhase = 3;
const indicatorPhase = 4;
const languageIndicatorPhase = 5;
const langIndicatorAudioPhase = 6;
const langRatingScaleAudioPhase = 7;
const indicatorImagePhase = 8;

const scorecardDownloadPhases = {
  1: 'failed',
  2: 'failed',
  3: 'failed',
  4: 'failed',
  5: 'failed',
  6: 'failed',
  7: 'failed',
  8: 'failed',
}

export {
  scorecardDownloadPhases,
  indicatorPhase,
  languageIndicatorPhase,
  cafPhase,
  ratingScalePhase,
  programLanguagePhase,
  langIndicatorAudioPhase,
  langRatingScaleAudioPhase,
  indicatorImagePhase,
  scorecardDownloadSteps,
};