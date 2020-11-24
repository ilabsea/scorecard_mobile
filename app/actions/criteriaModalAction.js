export const setModalVisible = (visible) => {
  return {
    type: 'SET_MODAL_VISIBLE',
    payload: visible
  }
}

export const setModalCriteria = (criteria) => {
  return {
    type: 'SET_MODAL_CRITERIA',
    payload: criteria
  }
}
