export const SETUP = 1;
export const PROPOSED_CRITERIA = 2;
export const INDICATOR_DEVELOPMENT = 3;
export const VOTING = 4;
export const SCORECARD_RESULT = 5;

export const scorecardTrackingSteps = {
  0: { screen_name: 'new scorecard', class_name: 'NewScorecard', action_name: 'join_scorecard' },
  1: { screen_name: 'scorecard preference/downloaded', class_name: 'ScorecardPreference', action_name: 'downloaded' },
  2: { screen_name: 'scorecard preference/finished', class_name: 'ScorecardPreference', action_name: 'finished_preference' },
  3: { screen_name: 'facilitator', class_name: 'Facilitator', action_name: 'finished_facilitator' },
  4: { screen_name: 'participant list', class_name: 'ParticipantList', action_name: 'finished_participant_list' },
  5: { screen_name: 'proposed criteria', class_name: 'ProposedCriteria', action_name: 'finished_proposed_criteria' },
  6: { screen_name: 'indicator development', class_name: 'IndicatorDevelopment', action_name: 'finished_indicator_development' },
  7: { screen_name: 'voting criteria list', class_name: 'VotingCriteriaList', action_name: 'finished_voting' },
  8: { screen_name: 'scorecard result', class_name: 'ScorecardResult', action_name: 'finished_scorecard_result' },
  9: { screen_name: 'scorecard progress/finish setup', class_name: 'ScorecardProgress', action_name: 'finished_setup' },
  10: { screen_name: 'scorecard progress/submit', class_name: 'ScorecardProgress', action_name: 'submitted' }
};