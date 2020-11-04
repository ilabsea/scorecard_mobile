const initState = {
  isLoading: false,
  error: null,
  result: null,
};

const reducerStates = (success, failed, action) => {
  switch (action.type) {
    case success:
      return {
        isLoading: false,
        error: null,
        result: action.response,
      };
    case failed:
      return {
        isLoading: false,
        error: action.error,
        result: null,
      };
    default:
      return initState;
  }
}

export {reducerStates, initState};