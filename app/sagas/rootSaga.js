import {takeLatest} from 'redux-saga/effects';
import {authenticate} from './sessionSaga';

function* rootSaga() {
  yield takeLatest('AUTHENTICATE', authenticate);
}

export default rootSaga;