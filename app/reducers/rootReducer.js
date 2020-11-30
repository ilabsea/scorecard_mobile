import {combineReducers} from 'redux';
import {authenticateReducer} from './sessionReducer';
import {getScorecardDetailReducer} from './scorecardReducer';
import {loadIndicatorListReducer} from './indicatorReducer';
import {loadCafListReducer} from './cafReducer';
import {loadProgramLanguageReducer} from './programLanguageReducer';
import selectedCriteriaReducer from './selectedCriteriaReducer';
import proposedCriteriaReducer from './proposedCriteriaReducer';
import votingCriteriaReducer from './votingCriteriaReducer';
import criteriaModalReducer from './criteriaModalReducer';
import participantReducer from './participantReducer';

const allReducers = combineReducers({
  authenticateReducer,
  getScorecardDetailReducer,
  loadIndicatorListReducer,
  loadCafListReducer,
  loadProgramLanguageReducer,
  selectedCriterias: selectedCriteriaReducer,
  proposedCriterias: proposedCriteriaReducer,
  votingCriterias: votingCriteriaReducer,
  criteriaModal: criteriaModalReducer,
  participantReducer,
});

const rootReducer = (state, action) => {
  return allReducers(state, action);
};

export default rootReducer;
