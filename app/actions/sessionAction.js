const authenticateAction = (backendUrl, username, password, callback) => ({
  type: 'AUTHENTICATE',
  payload: {
    backendUrl: backendUrl,
    username: username,
    password: password,
    callback: callback,
  },
});

export {authenticateAction};