const getScorecardDetailAction = (code, callback) => ({
  type: 'GET_SCORECARD_DETAIL',
  payload: {
    code: code,
    callback: callback,
  },
});

export {getScorecardDetailAction};