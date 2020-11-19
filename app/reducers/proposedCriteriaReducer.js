const data = [{tag: 'other'}];

for(let i=0; i<5; i++) {
  data.push({tag: `criteria ${i+1}`});
}

const proposedCriteriaReducer = (state=data, action) => {
  switch(action.type) {
    case 'ADD_TO_PROPOSED':
      return [...state, action.payload];
    case 'REMOVE_FROM_PROPOSED':
      return state.filter(critera => critera.tag != action.payload.tag);
    case 'RESET_PROPOSED':
      return data;
    default:
      return state;
  }
}

export default proposedCriteriaReducer;
