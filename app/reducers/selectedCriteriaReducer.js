import realm from '../db/schema';

const selectedCriteriaReducer = (state=[], action) => {
  switch(action.type) {
    case 'SET_SELECTED_CRITERIAS':
      return action.payload;
    case 'ADD_TO_SELECTED':
      return [...state, action.payload];
    case 'REMOVE_FROM_SELECTED':
      return state.filter(critera => critera.tag != action.payload.tag);
    default:
      return state;
  }
}

export default selectedCriteriaReducer;
