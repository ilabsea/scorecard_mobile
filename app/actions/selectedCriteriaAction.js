export const addToSelected = (criteria) => {
  return {
    type: 'ADD_TO_SELECTED',
    payload: criteria
  }
}

export const removeFromSelected = (criteria) => {
  return {
    type: 'REMOVE_FROM_SELECTED',
    payload: criteria
  }
}

export const removeAll = () => {
  return {
    type: 'REMOVE_ALL'
  }
}
