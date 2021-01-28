import { getAll as getAllProgramLanguage } from '../services/program_language_service';

// Info download phases of scorecard contain program_language, caf, rating_scale, indicator, language_indicator_scale, and indicator_image
const scorecardInfoDownloadSteps = 6;

const programLanguagePhase = 1;
const cafPhase = 2;
const ratingScalePhase = 3;
const indicatorPhase = 4;
const languageIndicatorPhase = 5;
const indicatorImagePhase = 6;

// Media download phases of scorecard contain indicator_audio, and rating_scale_audio
const scorecardAudioDownloadSteps = 2;

const langIndicatorAudioPhase = 7;
const langRatingScaleAudioPhase = 8;

const scorecardInfoDownloadPhases = {
  1: 'failed',
  2: 'failed',
  3: 'failed',
  4: 'failed',
  5: 'failed',
  6: 'failed',
};

// Ex: {
//  langIndicatorAudioPhase: {
//    km: 'downloaded',
//    jr: 'failed',
//  },
//  langRatingScaleAudioPhase: {
//    km: 'downloaded',
//    jr: 'failed,
//  }
// }
const scorecardAudioDownloadPhases = (programId) => {
  const programLanguages = getAllProgramLanguage(programId);
  const downloadState = {};

  programLanguages.map((language) => {
    downloadState[language.code] = 'failed';
  });

  return JSON.stringify({ langIndicatorAudioPhase: downloadState, langRatingScaleAudioPhase: downloadState });
}

const INFO = 'INFO';
const AUDIO = 'AUDIO';

export {
  scorecardInfoDownloadSteps,
  programLanguagePhase,
  cafPhase,
  ratingScalePhase,
  indicatorPhase,
  languageIndicatorPhase,
  scorecardAudioDownloadSteps,
  langIndicatorAudioPhase,
  indicatorImagePhase,
  langRatingScaleAudioPhase,
  scorecardInfoDownloadPhases,
  scorecardAudioDownloadPhases,
  INFO,
  AUDIO,
  // getDefaultDownloadMedia,
};