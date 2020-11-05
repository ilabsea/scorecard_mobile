import {reducerStates, initState} from '../services/reducer_service';

const loadCafListReducer = (state = initState, action) => {
  return reducerStates('LOAD_CAF_SUCCESS', 'LOAD_CAF_FAILED', action);
};

export {loadCafListReducer};
