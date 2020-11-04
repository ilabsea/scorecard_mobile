const loadAction = (type, id, callback) => {
  return {
    type: type,
    payload: {
      id: id,
      callback: callback,
    },
  };
}

export {loadAction};