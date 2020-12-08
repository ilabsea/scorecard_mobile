export const saveCriteria = (scorecardUUID) => {
  return {
    type: 'SAVE_CRITERIA',
    payload: {
      scorecardUUID,
    },
  };
}