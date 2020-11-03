import {call, put} from 'redux-saga/effects';
import CafApi from '../api/CafApi';
import sagaErrorHandler from '../services/saga_error_handler_service';

function* loadCafList(action) {
  const {localNgoId, callback} = action.payload;

  try {
    const response = yield call(CafApi.load, localNgoId, callback);
    callback(true, response.data);
    yield put({type: 'LOAD_CAF_SUCCESS', response: response.data});
  } catch (error) {
    yield sagaErrorHandler(error, 'LOAD_CAF_FAILED');
  }
}

export {loadCafList};
