import {call, put} from 'redux-saga/effects';
import CafApi from '../api/CafApi';
import sagaErrorHandler from '../services/saga_error_handler_service';

function* loadCafList(action) {
  const {id, callback} = action.payload;
  const cafApi = new CafApi();

  try {
    const response = yield call(cafApi.load, id, callback);
    callback(true, response.data);
    yield put({type: 'LOAD_CAF_SUCCESS', response: response.data});
  } catch (error) {
    yield sagaErrorHandler(error, 'LOAD_CAF_FAILED', callback);
  }
}

export {loadCafList};
