import { getAll as getAllProgramLanguage } from '../services/program_language_service';

// Download phases of scorecard contain indicator, language_indicator, caf,
// rating_scale, program_language, lang_indicator_audio, lang_rating_scale_audio, and indicator_image
const scorecardDownloadSteps = 7;

const cafPhase = 1;
const ratingScalePhase = 2;
const indicatorPhase = 3;
const languageIndicatorPhase = 4;
const indicatorImagePhase = 5;
const langIndicatorAudioPhase = 6;
const langRatingScaleAudioPhase = 7;

const scorecardDownloadPhases = {
  1: 'failed',
  2: 'failed',
  3: 'failed',
  4: 'failed',
  5: 'failed',
  6: 'failed',
  7: 'failed',
}

export {
  scorecardDownloadPhases,
  indicatorPhase,
  languageIndicatorPhase,
  cafPhase,
  ratingScalePhase,
  langIndicatorAudioPhase,
  langRatingScaleAudioPhase,
  indicatorImagePhase,
  scorecardDownloadSteps,
};