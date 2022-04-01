import VotingIndicator from '../models/VotingIndicator';
import proposedIndicatorHelper from '../helpers/proposed_indicator_helper';
import { getIndicatorActivitiesAttrs } from '../helpers/indicator_activity_helper';

const votingAttributesHelper = (() => {
  return {
    parse
  }

  function parse(scorecard) {
    let votingIndicators = JSON.parse(JSON.stringify(VotingIndicator.getAll(scorecard.uuid)));
    let columns = ['uuid', 'scorecard_uuid', 'median', 'order'];
    let votingIndicatorAttr = proposedIndicatorHelper.getProposedIndicatorAttributes(scorecard, votingIndicators, columns, false);

    votingIndicatorAttr.map((votingIndicator, index) => {
      votingIndicatorAttr[index].display_order = votingIndicator.order;

      const { activities_attrs, suggested_actions_attrs } = getIndicatorActivitiesAttrs(scorecard.uuid, votingIndicator.uuid);
      votingIndicatorAttr[index].indicator_activities_attributes = activities_attrs;
      votingIndicatorAttr[index].suggested_actions_attributes = suggested_actions_attrs;

      delete votingIndicatorAttr[index].order
    });

    return { 'voting_indicators_attributes': votingIndicatorAttr };
  }
})();

export default votingAttributesHelper;