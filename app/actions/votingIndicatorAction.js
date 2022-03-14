export const getAll = (scorecard_uuid) => {
  return {
    type: 'GET_ALL',
    payload: scorecard_uuid
  }
}

export const setVotingIndicators = (indicators) => {
  return {
    type: 'SET_VOTING_INDICATORS',
    payload: indicators
  }
}
