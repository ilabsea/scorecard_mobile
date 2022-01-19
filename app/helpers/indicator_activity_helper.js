import VotingCriteria from '../models/VotingCriteria';
import { INDICATOR_ACTIVITIES, SUGGESTED_ACTION } from '../constants/indicator_activity_constant';

export const getIndicatorActivitiesAttrs = (scorecardUuid, votingCriteriaUuid) => {
  const votingCriteria = VotingCriteria.findByUuid(votingCriteriaUuid);
  let activitiesAttrs = [];

  INDICATOR_ACTIVITIES.map(indicatorActivity => {
    activitiesAttrs = [...activitiesAttrs, ..._getAttrs(scorecardUuid, votingCriteria, indicatorActivity)]
  });

  return activitiesAttrs;
}

// private method
const _getAttrs = (scorecardUuid, votingCriteria, indicatorActivity) => {
  const activityName = indicatorActivity.name;
  const activities = JSON.parse(votingCriteria[activityName]);
  let activityAttrs = [];

  activities.map((activity, index) => {
    const attrs = {
      voting_indicator_uuid: votingCriteria.uuid,
      scorecard_uuid: scorecardUuid,
      content: activity,
      selected: activityName == SUGGESTED_ACTION ? votingCriteria.suggested_action_status[index] : false,
      type: indicatorActivity.type
    }

    activityAttrs.push(attrs);
  });

  return activityAttrs;
}