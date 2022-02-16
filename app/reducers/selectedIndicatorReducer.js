const selectedIndicatorReducer = (state=[], action) => {
  switch(action.type) {
    case 'SET_SELECTED_INDICATORS':
      return action.payload;
    case 'ADD_TO_SELECTED':
      return [...state, action.payload];
    case 'REMOVE_FROM_SELECTED':
      return state.filter(critera => critera.indicatorable_id != action.payload.indicatorable_id);
    default:
      return state;
  }
}

export default selectedIndicatorReducer;
