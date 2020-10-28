const loadProgramLanguageAction = (programId, callback) => ({
  type: 'LOAD_PROGRAM_LANGUAGE',
  payload: {
    programId: programId,
    callback: callback,
  },
});

export {loadProgramLanguageAction};
