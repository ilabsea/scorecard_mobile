import { ERROR_SCORECARD_COMPLETED, ERROR_SCORECARD_EXECUTED } from '../constants/error_constant';

const scorecardHelper = (() => {
  return {
    isScorecardAvailable,
    getScorecardErrorType,
  };

  function isScorecardAvailable(scorecard) {
    return !scorecard.progress || scorecard.progress == 'downloaded';
  }

  function getScorecardErrorType(scorecard) {
    if (!scorecard.progress)
      return '';
    else if (scorecard.progress == 'submitted')
      return ERROR_SCORECARD_COMPLETED;

    return ERROR_SCORECARD_EXECUTED;
  }
})();

export default scorecardHelper;