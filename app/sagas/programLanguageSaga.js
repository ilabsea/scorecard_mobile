import {call, put} from 'redux-saga/effects';
import ProgramLanguageApi from '../api/ProgramLanguageApi';
import sagaErrorHandler from '../services/saga_error_handler_service';

function* loadProgramLanguage(action) {
  const {programId, callback} = action.payload;

  try {
    const response = yield call(ProgramLanguageApi.load, programId, callback);
    callback(true, response.data);
    yield put({type: 'LOAD_PROGRAM_LANGUAGE_SUCCESS', response: response.data});
  } catch (error) {
    yield sagaErrorHandler(error, 'LOAD_PROGRAM_LANGUAGE_FAILED');
  }
}

export {loadProgramLanguage};
