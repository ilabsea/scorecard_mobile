import {reducerStates, initState} from '../services/reducer_service';

const loadIndicatorListReducer = (state = initState, action) => {
  return reducerStates('LOAD_INDICATOR_SUCCESS', 'LOAD_INDICATOR_FAILED', action);
};

export {loadIndicatorListReducer};