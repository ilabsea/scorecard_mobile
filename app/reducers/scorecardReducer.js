const initState = {
  isLoading: false,
  error: null,
};

const getScorecardDetailReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_SCORECARD_DETAIL':
      return {
        isLoading: true,
      };
    case 'GET_SCORECARD_DETAIL_SUCCESS':
      return {
        isLoading: false,
        error: null,
      };
    case 'GET_SCORECARD_DETAIL_FAILED':
      return {
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export {getScorecardDetailReducer};