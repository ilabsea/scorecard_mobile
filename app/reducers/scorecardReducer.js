import {reducerStates, initState} from '../services/reducer_service';

const getScorecardDetailReducer = (state = initState, action) => {
  return reducerStates('GET_SCORECARD_DETAIL_SUCCESS', 'GET_SCORECARD_DETAIL_FAILED', action);
};

export {getScorecardDetailReducer};