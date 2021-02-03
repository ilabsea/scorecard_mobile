import { getAll as getAllProgramLanguage } from '../services/program_language_service';

// Download phases of scorecard contain indicator, language_indicator, caf,
// rating_scale, program_language, lang_indicator_audio, lang_rating_scale_audio, and indicator_image
const scorecardDownloadSteps = 7;

// Audio phases of scorecard contain language_indicator_audio and language_rating_scale_audio
const scorecardDownloadAudioSteps = 2;

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

const scorecardAudioDownloadPhases = (programId) => {
  const programLanguages = getAllProgramLanguage(programId);
  const downloadState = {};

  programLanguages.map((language) => {
    downloadState[language.code] = 'failed';
  });

  return JSON.stringify({ 6: downloadState, 7: downloadState });
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
  scorecardDownloadAudioSteps,
  scorecardAudioDownloadPhases,
};