import VotingCriteria from '../models/VotingCriteria';
import { INDICATOR_ACTIVITIES, SUGGESTED_ACTION } from '../constants/indicator_activity_constant';

export const getIndicatorActivitiesAttrs = (scorecardUuid, votingCriteriaUuid) => {
  const votingCriteria = VotingCriteria.findByUuid(votingCriteriaUuid);
  let activitiesAttrs = [];
  let suggestedActionsAttrs = [];

  INDICATOR_ACTIVITIES.map(indicatorActivity => {
    const attrs = _getAttrs(scorecardUuid, votingCriteria, indicatorActivity)
    activitiesAttrs = [...activitiesAttrs, ...attrs.activities_attrs];
    suggestedActionsAttrs = [...suggestedActionsAttrs, ...attrs.suggested_actions_attrs];
  });

  return {
    activities_attrs: activitiesAttrs,
    suggested_actions_attrs: suggestedActionsAttrs
  }
}

// private method
const _getAttrs = (scorecardUuid, votingCriteria, indicatorActivity) => {
  const activityName = indicatorActivity.name;
  const activities = JSON.parse(votingCriteria[activityName]);
  let activityAttrs = [];
  let suggestedActionsAttrs = [];

  if (!!activities) {
    activities.map((activity, index) => {
      let attrs = {
        voting_indicator_uuid: votingCriteria.uuid,
        scorecard_uuid: scorecardUuid,
        content: activity,
        selected: activityName == SUGGESTED_ACTION ? votingCriteria.suggested_action_status[index] : false,
      }

      if (activityName === SUGGESTED_ACTION)
        suggestedActionsAttrs.push(attrs);

      activityAttrs.push({...attrs, ...{ type: indicatorActivity.type }});
    });
  }

  return {
    activities_attrs: activityAttrs,
    suggested_actions_attrs: suggestedActionsAttrs
  }
}