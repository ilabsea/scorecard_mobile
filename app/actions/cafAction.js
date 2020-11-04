import {loadAction} from './baseAction';

const loadCafListAction = (localNgoId, callback) => (loadAction('LOAD_CAF', localNgoId, callback));

export {loadCafListAction};
