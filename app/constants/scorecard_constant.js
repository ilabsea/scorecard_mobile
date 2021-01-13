const scorecardItem = {
  indicator: 'indicator_downloaded',
  language_indicator: 'language_indicator_downloaded',
  caf: 'caf_downloaded',
  audio: 'audio_downloaded',
  rating_scale: 'rating_scale_downloaded',
  program_language: 'program_language_downloaded',
};

// Download phases of scorecard contain indicator, language_indicator, caf, audio, rating_scale, and program_language
const scorecardDownloadSteps = 6;

const indicatorPhase = 1;
const languageIndicatorPhase = 2;
const cafPhase = 3;
const audioPhase = 4;
const ratingScalePhase = 5;
const programLanguagePhase = 6;

const scorecardDownloadPhases = {
  1: 'failed',
  2: 'failed',
  3: 'failed',
  4: 'failed',
  5: 'failed',
  6: 'failed',
}

export {
  scorecardItem,
  scorecardDownloadPhases,
  indicatorPhase,
  languageIndicatorPhase,
  cafPhase,
  audioPhase,
  ratingScalePhase,
  programLanguagePhase,
  scorecardDownloadSteps,
};