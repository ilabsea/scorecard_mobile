import ScorecardReference from '../models/ScorecardReference';

const scorecardReferenceReducer = (state = [], action) => {
  switch(action.type) {
    case 'GET_ALL_SCORECARD_REFERENCES':
      return ScorecardReference.findByScorecard(action.scorecard_uuid);
    case 'SET_SCORECARD_PREFERENCES':
      return action.scorecard_references;
    default:
      return state;
  }
}

export default scorecardReferenceReducer;