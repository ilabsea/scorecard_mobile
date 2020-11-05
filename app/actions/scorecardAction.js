import {loadAction} from './baseAction';

const getScorecardDetailAction = (code, callback) => (loadAction('GET_SCORECARD_DETAIL', code, callback));

export {getScorecardDetailAction};