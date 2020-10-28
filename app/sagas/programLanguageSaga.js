import {call, put} from 'redux-saga/effects';
import ProgramLanguageApi from '../api/ProgramLanguageApi';

function* loadProgramLanguage(action) {
  const {programId, callback} = action.payload;

  try {
    const response = yield call(ProgramLanguageApi.load, programId, callback);
    callback(true, response.data);
    yield put({type: 'LOAD_PROGRAM_LANGUAGE_SUCCESS', response: response.data});
  } catch (error) {
    if (error.response != null && error.response != undefined) {
      let err = error.response.data;
      if (err == null) err = error.response;

      callback(false, err);
      yield put({type: 'LOAD_PROGRAM_LANGUAGE_FAILED', err});
    }
  }
}

export {loadProgramLanguage};
