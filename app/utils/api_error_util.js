const getErrorObject = (error) => {
  let errorObject = {
    status: '',
    message: error.toJSON().message,
  };

  if (error.response != undefined)
    errorObject.status = error.response.status;
  else {
    errorObject.status = 511;
  }

  return errorObject;
}

export { getErrorObject };