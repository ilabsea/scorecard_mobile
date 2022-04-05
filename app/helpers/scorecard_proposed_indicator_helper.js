import ScorecardProposedIndicator from '../models/ScorecardProposedIndicator';

const scorecardProposedIndicatorHelper = (() => {
  return {
    getCurrentOrderNumber,
  }

  function getCurrentOrderNumber(scorecardUuid) {
    const currentOrderNumber = ScorecardProposedIndicator.getLastOrderByScorecard(scorecardUuid) + 1;
    ScorecardProposedIndicator.create({ scorecard_uuid: scorecardUuid, order: currentOrderNumber });

    return currentOrderNumber;
  }
})();

export default scorecardProposedIndicatorHelper;