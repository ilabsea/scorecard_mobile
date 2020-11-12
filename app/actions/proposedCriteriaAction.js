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

export const resetProposed = (criteria) => {
  return {
    type: 'RESET_PROPOSED'
  }
}

