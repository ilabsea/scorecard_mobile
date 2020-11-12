const selectedCriteriaReducer = (state=[], action) => {
  switch(action.type) {
    case 'ADD_TO_SELECTED':
      return [...state, action.payload];
    case 'REMOVE_FROM_SELECTED':
      return state.filter(critera => critera.tag != action.payload.tag);
    case 'REMOVE_ALL':
      return [];
    default:
      return state;
  }
}

export default selectedCriteriaReducer;
