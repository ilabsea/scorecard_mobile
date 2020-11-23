const initState = {participants: []};

const participantReducer = (state=initState, action) => {
  switch (action.type) {
    case 'SAVE_PARTICIPANT':
      return {participants: action.payload};
    default:
      return initState;
  }
};

export default participantReducer;
