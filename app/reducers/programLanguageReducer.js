import {reducerStates, initState} from '../services/reducer_service';

const loadProgramLanguageReducer = (state = initState, action) => {
  return reducerStates('AUTHENTICATE_SUCCESS', 'AUTHENTICATE_FAILED', action);
};

export {loadProgramLanguageReducer};
