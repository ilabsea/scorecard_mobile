import {call, put} from 'redux-saga/effects';
import IndicatorApi from '../api/IndicatorApi';
import sagaErrorHandler from '../services/saga_error_handler_service';

function* loadIndicatorList(action) {
  const {categoryId, callback} = action.payload;

  try {
    const response = yield call(IndicatorApi.load, categoryId, callback);
    callback(true, response.data);
    yield put({type: 'LOAD_INDICATOR_SUCCESS', response: response.data});
  } catch (error) {
    yield sagaErrorHandler(error, 'LOAD_INDICATOR_FAILED');
  }
};

export {loadIndicatorList};