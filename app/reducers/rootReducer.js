import {combineReducers} from 'redux';
import {authenticateReducer} from './sessionReducer';
import {getScorecardDetailReducer} from './scorecardReducer';

const allReducers = combineReducers({
  authenticateReducer,
  getScorecardDetailReducer,
});

const rootReducer = (state, action) => {
  return allReducers(state, action);
};

export default rootReducer;