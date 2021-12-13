export const getAllScorecardReferences = (scorecardUuid) => {
  return {
    type: 'GET_ALL_SCORECARD_REFERENCES',
    scorecard_uuid: scorecardUuid
  }
}

export const setScorecardReferences = (scorecardReferences) => {
  return {
    type: 'SET_SCORECARD_PREFERENCES',
    scorecard_references: scorecardReferences
  }
}
