import {call, put} from 'redux-saga/effects';
import ScorecardApi from '../api/ScorecardApi';

function* getScorecardDetail(action) {
  const {code, callback} = action.payload;

  try {
    const response = yield call(ScorecardApi.getDetail, code, callback);
    const responseData = response.data;
    callback(true, responseData);
    yield put({type: 'GET_SCORECARD_DETAIL_SUCCESS', response: responseData});
  } catch (error) {
    if (error.response != null && error.response != undefined) {
      let err = error.response.data;
      if (err == null) err = error.response;

      callback(false, err);
      yield put({type: 'GET_SCORECARD_DETAIL_FAILED', err});
    }
  }
};

export {getScorecardDetail};