import VotingIndicator from '../models/VotingIndicator';
import proposedIndicatorHelper from '../helpers/proposed_indicator_helper';
import { getIndicatorActivitiesAttrs } from '../helpers/indicator_activity_helper';

const onlineVotingAttributesUtil = (() => {
  return {
    parse
  }

  function parse(scorecard) {
    let votingIndicators = JSON.parse(JSON.stringify(VotingIndicator.getAll(scorecard.uuid)));
    let columns = ['uuid', 'scorecard_uuid', 'median', 'order'];
    let votingIndicatorAttr = proposedIndicatorHelper.getProposedIndicatorAttributes(scorecard, votingIndicators, columns, false);
    let attrs = [];

    votingIndicatorAttr.map((votingIndicator, index) => {
      const { activities_attrs } = getIndicatorActivitiesAttrs(scorecard.uuid, votingIndicator.uuid);
      attrs.push({
        id: votingIndicator.uuid,
        indicator_activities_attributes: activities_attrs,
      });
    });

    return { 'voting_indicators_attributes': attrs };
  }
})();

export default onlineVotingAttributesUtil;
