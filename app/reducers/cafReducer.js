const initState = {
  isLoading: false,
  error: null,
  cafs: [],
};

const loadCafListReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOAD_CAF':
      return {
        isLoading: true,
        error: null,
      };
    case 'LOAD_CAF_SUCCESS':
      return {
        isLoading: false,
        error: null,
        cafs: action.response,
      };
    case 'LOAD_CAF_FAILED':
      return {
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export {loadCafListReducer};
