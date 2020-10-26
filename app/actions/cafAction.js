const loadCafListAction = (localNgoId, callback) => ({
  type: 'LOAD_CAF',
  payload: {
    localNgoId: localNgoId,
    callback: callback,
  },
});

export {loadCafListAction};
