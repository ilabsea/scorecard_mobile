import {combineReducers} from 'redux';
import {authenticateReducer} from './sessionReducer';
import {getScorecardDetailReducer} from './scorecardReducer';
import {loadIndicatorListReducer} from './indicatorReducer';
import {loadCafListReducer} from './cafReducer';
import {loadProgramLanguageReducer} from './programLanguageReducer';

const allReducers = combineReducers({
  authenticateReducer,
  getScorecardDetailReducer,
  loadIndicatorListReducer,
  loadCafListReducer,
  loadProgramLanguageReducer,
});

const rootReducer = (state, action) => {
  return allReducers(state, action);
};

export default rootReducer;