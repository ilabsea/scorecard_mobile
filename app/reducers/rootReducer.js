import {combineReducers} from 'redux';
import {authenticateReducer} from './sessionReducer';
import {getScorecardDetailReducer} from './scorecardReducer';
import {loadIndicatorListReducer} from './indicatorReducer';
import {loadCafListReducer} from './cafReducer';

const allReducers = combineReducers({
  authenticateReducer,
  getScorecardDetailReducer,
  loadIndicatorListReducer,
  loadCafListReducer,
});

const rootReducer = (state, action) => {
  return allReducers(state, action);
};

export default rootReducer;