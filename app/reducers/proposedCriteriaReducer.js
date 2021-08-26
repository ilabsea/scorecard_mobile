const sort = (arr) => {
  return arr.sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

const proposedCriteriaReducer = (state=[], action) => {
  switch(action.type) {
    case 'SET_PROPOSED_CRITERIAS':
      return sort(action.payload || []);
    case 'ADD_TO_PROPOSED':
      return sort([...state, action.payload]);
    case 'REMOVE_FROM_PROPOSED':
      return state.filter(criteria => criteria.indicatorable_id != action.payload.indicatorable_id);
    default:
      return state;
  }
}

export default proposedCriteriaReducer;
