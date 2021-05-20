import { ERROR_SCORECARD_COMPLETED, ERROR_SCORECARD_EXECUTED } from '../constants/error_constant';

const scorecardHelper = (() => {
  return {
    isScorecardAvailable,
    getScorecardErrorType,
  };

  function isScorecardAvailable(scorecard) {
    return scorecard.status != 'completed';
  }

  function getScorecardErrorType(scorecard) {
    if (scorecard.status == 'completed')
      return ERROR_SCORECARD_COMPLETED;

    return scorecard.conducted_date ? ERROR_SCORECARD_EXECUTED : '';
  }
})();

export default scorecardHelper;