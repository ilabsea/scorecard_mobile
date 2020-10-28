const initState = {
  isLoading: false,
  error: null,
  languages: [],
};

const loadProgramLanguageReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOAD_PROGRAM_LANGUAGE':
      return {
        isLoading: true,
        error: null,
      };
    case 'LOAD_PROGRAM_LANGUAGE_SUCCESS':
      return {
        isLoading: false,
        error: null,
        languages: action.response,
      };
    case 'LOAD_PROGRAM_LANGUAGE_FAILED':
      return {
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export {loadProgramLanguageReducer};
