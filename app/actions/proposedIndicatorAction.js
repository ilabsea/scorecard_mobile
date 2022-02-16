export const setProposedIndicators = (proposedIndicators) => {
  return {
    type: 'SET_PROPOSED_INDICATORS',
    payload: proposedIndicators
  }
}

export const addToProposed = (indicator) => {
  return {
    type: 'ADD_TO_PROPOSED',
    payload: indicator
  }
}

export const removeFromProposed = (indicator) => {
  return {
    type: 'REMOVE_FROM_PROPOSED',
    payload: indicator
  }
}
