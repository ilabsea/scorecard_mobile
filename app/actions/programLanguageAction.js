import {loadAction} from './baseAction';

const loadProgramLanguageAction = (programId, callback) => (loadAction('LOAD_PROGRAM_LANGUAGE', programId, callback));

export {loadProgramLanguageAction};
