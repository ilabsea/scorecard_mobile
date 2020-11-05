import {call, put} from 'redux-saga/effects';
import SessionApi from '../api/SessionApi';
import sagaErrorHandler from '../services/saga_error_handler_service';

function* authenticate(action) {
  const {username, password, callback} = action.payload;
  
  try {
    const response = yield call(SessionApi.authenticate, username, password, callback);
    callback(true, response.data);
    yield put({type: 'AUTHENTICATE_SUCCESS', response: response.data});
  } catch (error) {
    yield sagaErrorHandler(error, 'AUTHENTICATE_FAILED');
  }
}


export {authenticate};