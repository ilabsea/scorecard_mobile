import VotingCriteria from '../models/VotingCriteria';
import proposedIndicatorHelper from '../helpers/proposed_indicator_helper';
import { getIndicatorActivitiesAttrs } from '../helpers/indicator_activity_helper';

const votingAttributesHelper = (() => {
  return {
    parse
  }

  function parse(scorecard) {
    let votingCriterias = JSON.parse(JSON.stringify(VotingCriteria.getAll(scorecard.uuid)));
    let columns = ['uuid', 'scorecard_uuid', 'median', 'strength', 'weakness', 'suggested_action', 'order'];
    let votingCriteriaAttr = proposedIndicatorHelper.getProposedIndicatorAttributes(scorecard, votingCriterias, columns, false);

    votingCriteriaAttr.map((votingCriteria, index) => {
      votingCriteriaAttr[index].strength = votingCriteria.strength ? JSON.parse(votingCriteria.strength) : null;
      votingCriteriaAttr[index].weakness = votingCriteria.weakness ? JSON.parse(votingCriteria.weakness) : null;
      votingCriteriaAttr[index].suggested_action = votingCriteria.suggested_action ? JSON.parse(votingCriteria.suggested_action) : null;
      votingCriteriaAttr[index].display_order = votingCriteria.order;

      const { activities_attrs, suggested_actions_attrs } = getIndicatorActivitiesAttrs(scorecard.uuid, votingCriteria.uuid);
      votingCriteriaAttr[index].indicator_activities_attributes = activities_attrs;
      votingCriteriaAttr[index].suggested_actions_attributes = suggested_actions_attrs;

      delete votingCriteriaAttr[index].order
    });

    return { 'voting_indicators_attributes': votingCriteriaAttr };
  }
})();

export default votingAttributesHelper;