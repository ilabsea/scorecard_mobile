export const getAll = (scorecard_uuid) => {
  return {
    type: 'GET_ALL',
    payload: scorecard_uuid
  }
}
