import {loadAction} from './baseAction';

const loadIndicatorListAction = (facilityId, callback) => (loadAction('LOAD_INDICATOR', facilityId, callback));

export {loadIndicatorListAction};