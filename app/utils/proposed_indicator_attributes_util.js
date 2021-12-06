import ProposedCriteria from '../models/ProposedCriteria';
import proposedIndicatorHelper from '../helpers/proposed_indicator_helper';

const proposedIndicatorAttributesUtil = (() => {
  return {
    parse
  };

  function parse(scorecard) {
    let proposedCriterias = JSON.parse(JSON.stringify(ProposedCriteria.getAllByScorecard(scorecard.uuid)));
    let columns = ['scorecard_uuid', 'participant_uuid'];

    return { 'raised_indicators_attributes': proposedIndicatorHelper.getProposedIndicatorAttributes(scorecard, proposedCriterias, columns, true) };
  }
})();

export default proposedIndicatorAttributesUtil;