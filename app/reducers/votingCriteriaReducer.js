import realm from '../db/schema';
import votingCriteriaService from '../services/votingCriteriaService';

const votingCriteriaReducer = (state=[], action) => {
  switch(action.type) {
    case 'GET_ALL':
      return JSON.parse(JSON.stringify(votingCriteriaService.getAll(action.payload)));
    case 'SET_VOTING_CRITERIAS':
      return action.payload;
    default:
      return state;
  }
}

export default votingCriteriaReducer;
