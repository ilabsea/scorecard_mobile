const initState = {
  isLoading: false,
  error: null,
};

const authenticateReducer = (state = initState, action) => {
  switch (action.type) {
    case 'AUTHENTICATE':
      return {
        isLoading: true,
      };
    case 'AUTHENTICATE_SUCCESS':
      return {
        isLoading: false,
        error: null,
      };
    case 'AUTHENTICATE_FAILED':
      return {
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export {authenticateReducer};