const authenticateAction = (username, password, callback) => ({
  type: 'AUTHENTICATE',
  payload: {
    username: username,
    password: password,
    callback: callback,
  },
});

export {authenticateAction};