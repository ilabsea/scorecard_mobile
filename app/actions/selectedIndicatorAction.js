export const setSelectedIndicators = (selectedIndicators) => {
  return {
    type: 'SET_SELECTED_INDICATORS',
    payload: selectedIndicators
  }
}

export const addToSelected = (indicator) => {
  return {
    type: 'ADD_TO_SELECTED',
    payload: indicator
  }
}

export const removeFromSelected = (indicator) => {
  return {
    type: 'REMOVE_FROM_SELECTED',
    payload: indicator
  }
}
