import VotingCriteria from '../models/VotingCriteria';

const votingCriteriaReducer = (state=[], action) => {
  switch(action.type) {
    case 'GET_ALL':
      return JSON.parse(JSON.stringify(VotingCriteria.getAll(action.payload)));
    case 'SET_VOTING_CRITERIAS':
      return action.payload;
    default:
      return state;
  }
}

export default votingCriteriaReducer;
