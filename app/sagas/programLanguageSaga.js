import {call, put} from 'redux-saga/effects';
import ProgramLanguageApi from '../api/ProgramLanguageApi';
import sagaErrorHandler from '../services/saga_error_handler_service';

function* loadProgramLanguage(action) {
  const {id, callback} = action.payload;
  const programLanguageApi = new ProgramLanguageApi();

  try {
    const response = yield call(programLanguageApi.load, id, callback);
    callback(true, response.data);
    yield put({type: 'LOAD_PROGRAM_LANGUAGE_SUCCESS', response: response.data});
  } catch (error) {
    yield sagaErrorHandler(error, 'LOAD_PROGRAM_LANGUAGE_FAILED');
  }
}

export {loadProgramLanguage};
