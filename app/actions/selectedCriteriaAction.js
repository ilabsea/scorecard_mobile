export const setSelectedCriterias = (selectedCriterias) => {
  return {
    type: 'SET_SELECTED_CRITERIAS',
    payload: selectedCriterias
  }
}

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
