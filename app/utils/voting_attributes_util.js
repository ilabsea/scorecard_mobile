import proposedIndicatorHelper from '../helpers/proposed_indicator_helper';
import { getIndicatorActivitiesAttrs } from '../helpers/indicator_activity_helper';

const votingAttributesHelper = (() => {
  return {
    parse
  }

  function parse(scorecard) {
    let votingCriterias = JSON.parse(JSON.stringify(VotingCriteria.getAll(scorecard.uuid)));
    let columns = ['uuid', 'scorecard_uuid', 'median', 'order'];
    let votingCriteriaAttr = proposedIndicatorHelper.getProposedIndicatorAttributes(scorecard, votingCriterias, columns, false);

    votingCriteriaAttr.map((votingCriteria, index) => {
      votingCriteriaAttr[index].display_order = votingCriteria.order;

      const { activities_attrs, suggested_actions_attrs } = getIndicatorActivitiesAttrs(scorecard.uuid, votingIndicator.uuid);
      votingIndicatorAttr[index].indicator_activities_attributes = activities_attrs;
      votingIndicatorAttr[index].suggested_actions_attributes = suggested_actions_attrs;

      delete votingIndicatorAttr[index].order
    });

    return { 'voting_indicators_attributes': votingIndicatorAttr };
  }
})();

export default votingAttributesHelper;