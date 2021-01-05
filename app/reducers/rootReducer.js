import {combineReducers} from 'redux';
import selectedCriteriaReducer from './selectedCriteriaReducer';
import proposedCriteriaReducer from './proposedCriteriaReducer';
import votingCriteriaReducer from './votingCriteriaReducer';
import criteriaModalReducer from './criteriaModalReducer';
import participantReducer from './participantReducer';
import criteriaListReducer from './criteriaListReducer';
import {ratingScaleAudioReducer} from './ratingScaleReducer';
import currentScorecardReducer from './currentScorecardReducer';

const allReducers = combineReducers({
  selectedCriterias: selectedCriteriaReducer,
  proposedCriterias: proposedCriteriaReducer,
  votingCriterias: votingCriteriaReducer,
  criteriaModal: criteriaModalReducer,
  participantReducer,
  criteriaListReducer,
  ratingScaleAudioReducer,
  currentScorecard: currentScorecardReducer,
});

const rootReducer = (state, action) => {
  return allReducers(state, action);
};

export default rootReducer;
