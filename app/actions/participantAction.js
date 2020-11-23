export const saveParticipant = (participants) => {
  return {
    type: 'SAVE_PARTICIPANT',
    payload: participants,
  };
}