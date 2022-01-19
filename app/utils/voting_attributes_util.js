import VotingCriteria from '../models/VotingCriteria';
import proposedIndicatorHelper from '../helpers/proposed_indicator_helper';
import { getIndicatorActivitiesAttrs } from '../helpers/indicator_activity_helper';

const votingAttributesHelper = (() => {
  return {
    parse
  }

  function parse(scorecard) {
    let votingCriterias = JSON.parse(JSON.stringify(VotingCriteria.getAll(scorecard.uuid)));
    let columns = ['uuid', 'scorecard_uuid', 'median', 'strength', 'weakness', 'suggested_action'];
    let votingCriteriaAttr = proposedIndicatorHelper.getProposedIndicatorAttributes(scorecard, votingCriterias, columns);

    votingCriteriaAttr.map((votingCriteria, index) => {
      votingCriteriaAttr[index].strength = votingCriteria.strength ? JSON.parse(votingCriteria.strength) : null;
      votingCriteriaAttr[index].weakness = votingCriteria.weakness ? JSON.parse(votingCriteria.weakness) : null;
      votingCriteriaAttr[index].suggested_action = votingCriteria.suggested_action ? JSON.parse(votingCriteria.suggested_action) : null;
      votingCriteriaAttr[index].indicator_activities_attributes = getIndicatorActivitiesAttrs(scorecard.uuid, votingCriteria.uuid);
    });

    return { 'voting_indicators_attributes': votingCriteriaAttr };
  }
})();

export default votingAttributesHelper;