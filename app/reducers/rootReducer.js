import {combineReducers} from 'redux';
import selectedCriteriaReducer from './selectedCriteriaReducer';
import proposedCriteriaReducer from './proposedCriteriaReducer';
import votingCriteriaReducer from './votingCriteriaReducer';
import criteriaModalReducer from './criteriaModalReducer';
import participantReducer from './participantReducer';
import criteriaListReducer from './criteriaListReducer';
import {ratingScaleAudioReducer} from './ratingScaleReducer';

const allReducers = combineReducers({
  selectedCriterias: selectedCriteriaReducer,
  proposedCriterias: proposedCriteriaReducer,
  votingCriterias: votingCriteriaReducer,
  criteriaModal: criteriaModalReducer,
  participantReducer,
  criteriaListReducer,
  ratingScaleAudioReducer,
});

const rootReducer = (state, action) => {
  return allReducers(state, action);
};

export default rootReducer;
