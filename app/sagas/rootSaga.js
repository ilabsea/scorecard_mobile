import {takeLatest} from 'redux-saga/effects';
import {authenticate} from './sessionSaga';
import {getScorecardDetail} from './scorecardSaga';
import {loadIndicatorList} from './indicatorSaga';
import {loadCafList} from './cafSaga';
import {loadProgramLanguage} from './programLanguageSaga';

function* rootSaga() {
  yield takeLatest('AUTHENTICATE', authenticate);
  yield takeLatest('GET_SCORECARD_DETAIL', getScorecardDetail);
  yield takeLatest('LOAD_INDICATOR', loadIndicatorList);
  yield takeLatest('LOAD_CAF', loadCafList);
  yield takeLatest('LOAD_PROGRAM_LANGUAGE', loadProgramLanguage);
}

export default rootSaga;