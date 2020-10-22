import {call, put} from 'redux-saga/effects';
import SessionApi from '../api/SessionApi';

function* authenticate(action) {
  const {backendUrl, username, password, callback} = action.payload;
  
  try {
    const response = yield call(SessionApi.authenticate, backendUrl, username, password, callback);
    const responseData = response.data;
    callback(true, responseData);
    yield put({type: 'AUTHENTICATE_SUCCESS', response: response.data});
  } catch (error) {
    if (error.response != null && error.response != undefined) {
      let err = error.response.data;
      if (err == null) err = error.response;

      callback(false, err);
      yield put({type: 'AUTHENTICATE_FAILED', err});
    }
  }
}


export {authenticate};