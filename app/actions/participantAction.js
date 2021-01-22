export const saveParticipant = (participants, scorecardUUID) => {
  return {
    type: 'SAVE_PARTICIPANT',
    payload: {
      participants,
      scorecardUUID,
    },
  };
}
