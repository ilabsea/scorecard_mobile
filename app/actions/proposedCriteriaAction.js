export const setProposedCriterias = (proposedCriterias) => {
  return {
    type: 'SET_PROPOSED_CRITERIAS',
    payload: proposedCriterias
  }
}

export const addToProposed = (criteria) => {
  return {
    type: 'ADD_TO_PROPOSED',
    payload: criteria
  }
}

export const removeFromProposed = (criteria) => {
  return {
    type: 'REMOVE_FROM_PROPOSED',
    payload: criteria
  }
}
