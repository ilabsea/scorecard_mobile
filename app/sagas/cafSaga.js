import {call, put} from 'redux-saga/effects';
import CafApi from '../api/CafApi';

function* loadCafList(action) {
  const {localNgoId, callback} = action.payload;

  try {
    const response = yield call(CafApi.load, localNgoId, callback);
    callback(true, response.data);
    yield put({type: 'LOAD_CAF_SUCCESS', response: response.data});
  } catch (error) {
    if (error.response != null && error.response != undefined) {
      let err = error.response.data;
      if (err == null) err = error.response;

      callback(false, err);
      yield put({type: 'LOAD_CAF_FAILED', err});
    }
  }
}

export {loadCafList};
