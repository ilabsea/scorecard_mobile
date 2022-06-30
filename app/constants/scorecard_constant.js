import { INDICATOR_BASE_STEP, PARTICIPANT_BASE_STEP } from './scorecard_step_constant';

// Download phases of scorecard contain indicator, language_indicator, caf,
// rating_scale, program_language, lang_indicator_audio, lang_rating_scale_audio, and indicator_image
const scorecardDownloadSteps = 6;

const cafPhase = 1;
const ratingScalePhase = 2;
const indicatorPhase = 3;
const languageIndicatorPhase = 4;
const langIndicatorAudioPhase = 5;
const langRatingScaleAudioPhase = 6;
const indicatorImagePhase = 7;

const scorecardDownloadPhases = {
  1: 'failed',
  2: 'failed',
  3: 'failed',
  4: 'failed',
  5: 'failed',
  6: 'failed',
}

const selfAssessment = 'self_assessment';
const commnunityScorecard =  'community_scorecard';

const scorecardStatuses = [
  { label: 'in_progress', value: 'in-progress' },
  { label: 'finished', value: 'finished' },
  { label: 'submitted', value: 'submitted' }
];

const scorecardTypes = [
  { label: 'self_assessment', value: 'self_assessment'},
  { label: 'community_scorecard', value: 'community_scorecard'}
];

const INDICATOR_BASE = 'indicatorBase';
const PARTICIPANT_BASE = 'participantBase';

const  PROPOSED_INDICATOR_METHODS = {
  'participantBase': { id: 1, name: PARTICIPANT_BASE, step: PARTICIPANT_BASE_STEP },
  'indicatorBase': { id: 2, name: INDICATOR_BASE, step: INDICATOR_BASE_STEP },
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
  selfAssessment,
  commnunityScorecard,
  scorecardStatuses,
  scorecardTypes,
  INDICATOR_BASE,
  PARTICIPANT_BASE,
  PROPOSED_INDICATOR_METHODS,
};