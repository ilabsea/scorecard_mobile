import {call, put} from 'redux-saga/effects';
import IndicatorApi from '../api/IndicatorApi';

function* loadIndicatorList(action) {
  const {categoryId, callback} = action.payload;

  try {
    const response = yield call(IndicatorApi.load, categoryId, callback);
    callback(true, response.data);
    yield put({type: 'LOAD_INDICATOR_SUCCESS', response: response.data});
  } catch (error) {
    if (error.response != null && error.response != undefined) {
      let err = error.response.data;
      if (err == null) err = error.response;

      callback(false, err);
      yield put({type: 'LOAD_INDICATOR_FAILED', err});
    }
  }
};

export {loadIndicatorList};