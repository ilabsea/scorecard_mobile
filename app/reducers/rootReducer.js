import {combineReducers} from 'redux';
import {authenticateReducer} from './sessionReducer';

const allReducers = combineReducers({
  authenticateReducer,
});

const rootReducer = (state, action) => {
  return allReducers(state, action);
};

export default rootReducer;