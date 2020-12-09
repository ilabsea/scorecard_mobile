import {Criteria} from '../services/criteria_service';
const initState = {criterias: []};

const getCriterias = (scorecardUUID) => {
  const criteria = new Criteria(scorecardUUID);
  return criteria.getCriterias();
}

const criteriaListReducer = (state=initState, action) => {
  switch (action.type) {
    case 'SAVE_CRITERIA':
      return {criterias: getCriterias(action.payload.scorecardUUID)};
    default:
      return state;
  }
};

export default criteriaListReducer;