import {takeLatest} from 'redux-saga/effects';
import {authenticate} from './sessionSaga';
import {getScorecardDetail} from './scorecardSaga';

function* rootSaga() {
  yield takeLatest('AUTHENTICATE', authenticate);
  yield takeLatest('GET_SCORECARD_DETAIL', getScorecardDetail);
}

export default rootSaga;