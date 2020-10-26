import {takeLatest} from 'redux-saga/effects';
import {authenticate} from './sessionSaga';
import {getScorecardDetail} from './scorecardSaga';
import {loadIndicatorList} from './indicatorSaga';
import {loadCafList} from './cafSaga';

function* rootSaga() {
  yield takeLatest('AUTHENTICATE', authenticate);
  yield takeLatest('GET_SCORECARD_DETAIL', getScorecardDetail);
  yield takeLatest('LOAD_INDICATOR', loadIndicatorList);
  yield takeLatest('LOAD_CAF', loadCafList);
}

export default rootSaga;