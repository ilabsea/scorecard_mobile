import ProposedIndicator from '../models/ProposedIndicator';
import proposedIndicatorHelper from '../helpers/proposed_indicator_helper';

const proposedIndicatorAttributesUtil = (() => {
  return {
    parse
  };

  function parse(scorecard) {
    const proposedIndicators = JSON.parse(JSON.stringify(ProposedIndicator.getAllByScorecard(scorecard.uuid)));
    const columns = ['scorecard_uuid', 'participant_uuid'];

    return { 'raised_indicators_attributes': proposedIndicatorHelper.getProposedIndicatorAttributes(scorecard, proposedIndicators, columns, true) };
  }
})();

export default proposedIndicatorAttributesUtil;