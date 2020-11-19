import realm from '../db/schema';

const votingCriteriaReducer = (state=[], action) => {
  switch(action.type) {
    case 'GET_ALL':
      return JSON.parse(JSON.stringify(realm.objects('VotingCriteria').filtered(`scorecard_uuid='${action.payload}'`)));
    default:
      return state;
  }
}

export default votingCriteriaReducer;
