export const getAll = (scorecard_uuid) => {
  return {
    type: 'GET_ALL',
    payload: scorecard_uuid
  }
}

export const setVotingCriterias = (criterias) => {
  return {
    type: 'SET_VOTING_CRITERIAS',
    payload: criterias
  }
}
