import {put} from 'redux-saga/effects';

function* sagaErrroHandler(error, constant, callback) {
  if (error.response != null && error.response != undefined) {
    let err = error.response.data;
    if (err == null) err = error.response;

    callback(false, err);
    yield put({type: constant, err});
  }
}

export default sagaErrroHandler;