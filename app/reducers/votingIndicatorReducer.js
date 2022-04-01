import VotingIndicator from '../models/VotingIndicator';

const votingIndicatorReducer = (state=[], action) => {
  switch(action.type) {
    case 'GET_ALL':
      return JSON.parse(JSON.stringify(VotingIndicator.getAll(action.payload)));
    case 'SET_VOTING_INDICATORS':
      return action.payload;
    default:
      return state;
  }
}

export default votingIndicatorReducer;
