const { init } = require("@sentry/react-native");

const initState = {
  isLoading: false,
  error: null,
  indicators: [],
};

const loadIndicatorListReducer = (state = initState, action) => {
  switch(action.type) {
    case 'LOAD_INDICATOR':
      return {
        isLoading: true,
        error: null,
      };
    case 'LOAD_INDICATOR_SUCCESS':
      return {
        isLoading: false,
        error: null,
        indicators: action.response,
      };
    case 'LOAD_INDICATOR_FAILED':
      return {
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export {loadIndicatorListReducer};