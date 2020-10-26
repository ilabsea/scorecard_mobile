const loadIndicatorListAction = (categoryId, callback) => ({
  type: 'LOAD_INDICATOR',
  payload: {
    categoryId: categoryId,
    callback: callback,
  },
});

export {loadIndicatorListAction};