const criteriaModalReducer = (state={ visible: false, criteria: {} }, action) => {
  switch(action.type) {
    case 'SET_MODAL_VISIBLE':
      return {...state, visible: action.payload };
    case 'SET_MODAL_CRITERIA':
      return {...state, criteria: action.payload };
    default:
      return state;
  }
}

export default criteriaModalReducer;
