import {loadAction} from './baseAction';

const loadIndicatorListAction = (categoryId, callback) => (loadAction('LOAD_INDICATOR', categoryId, callback));

export {loadIndicatorListAction};