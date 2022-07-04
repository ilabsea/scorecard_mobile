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
  'participantBase': { id: 1, name: PARTICIPANT_BASE, firebase_step_index: 12 },
  'indicatorBase': { id: 2, name: INDICATOR_BASE, firebase_step_index: 11 },
}

const SETUP = 1;
const PROPOSED_CRITERIA = 2;
const INDICATOR_DEVELOPMENT = 3;
const VOTING = 4;
const SCORECARD_RESULT = 5;

const scorecardTrackingSteps = {
  0: 'scorecard_joined',
  1: 'scorecard_downloaded',
  2: 'finished_preference',
  3: 'finished_facilitator',
  4: 'finished_participant_list',
  5: 'finished_proposed_criteria',
  6: 'finished_indicator_development',
  7: 'finished_voting',
  8: 'finished_scorecard_result',
  9: 'scorecard_completed',
  10: 'scorecard_submitted',
  11: 'propose_by_indicator_base',
  12: 'propose_by_participant_base',
};

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
  SETUP,
  PROPOSED_CRITERIA,
  INDICATOR_DEVELOPMENT,
  VOTING,
  SCORECARD_RESULT,
  scorecardTrackingSteps,
};