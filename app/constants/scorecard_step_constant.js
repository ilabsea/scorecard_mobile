export const SETUP = 1;
export const PROPOSED_CRITERIA = 2;
export const INDICATOR_DEVELOPMENT = 3;
export const VOTING = 4;
export const SCORECARD_RESULT = 5;

export const scorecardTrackingSteps = {
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
  10: 'scorecard_submitted'
};