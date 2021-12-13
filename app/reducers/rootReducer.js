import {combineReducers} from 'redux';
import selectedCriteriaReducer from './selectedCriteriaReducer';
import proposedCriteriaReducer from './proposedCriteriaReducer';
import votingCriteriaReducer from './votingCriteriaReducer';
import participantReducer from './participantReducer';
import criteriaListReducer from './criteriaListReducer';
import {ratingScaleAudioReducer} from './ratingScaleReducer';
import currentScorecardReducer from './currentScorecardReducer';
import scorecardReferenceReducer from './scorecardReferenceReducer';

const allReducers = combineReducers({
  selectedCriterias: selectedCriteriaReducer,
  proposedCriterias: proposedCriteriaReducer,
  votingCriterias: votingCriteriaReducer,
  participantReducer,
  criteriaListReducer,
  ratingScaleAudioReducer,
  currentScorecard: currentScorecardReducer,
  scorecardReferences: scorecardReferenceReducer,
});

const rootReducer = (state, action) => {
  return allReducers(state, action);
};

export default rootReducer;
