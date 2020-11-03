import {call, put} from 'redux-saga/effects';
import ScorecardApi from '../api/ScorecardApi';
import sagaErrorHandler from '../services/saga_error_handler_service';

function* getScorecardDetail(action) {
  const {code, callback} = action.payload;

  try {
    const response = yield call(ScorecardApi.getDetail, code, callback);
    const responseData = response.data;
    callback(true, responseData);
    yield put({type: 'GET_SCORECARD_DETAIL_SUCCESS', response: responseData});
  } catch (error) {
    yield sagaErrorHandler(error, 'GET_SCORECARD_DETAIL_FAILED');
  }
};

export {getScorecardDetail};