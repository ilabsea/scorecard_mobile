import DeviceInfo from 'react-native-device-info';
import Scorecard from '../models/Scorecard';
import ScorecardProgressApi from '../api/ScorecardProgressApi';
import { RUNNING, RENEWED } from '../constants/milestone_constant';

const scorecardMilestoneService = (() => {
  return {
    updateMilestone
  }

  async function updateMilestone(params, data, callback, errorCallback) {
    const { scorecardUuid, milestone } = params;
    const scorecard = Scorecard.find(scorecardUuid);
    let attrs = {
      scorecard_progress: {
        scorecard_uuid: scorecardUuid,
        status: milestone,
      }
    };

    await DeviceInfo.getAndroidId().then((androidId) => {
      attrs.scorecard_progress.device_id = androidId;
    });

    if (data)
      attrs = {...attrs, ...data};

    if (scorecard.milestone != RENEWED && (scorecard.milestone == milestone))
      return;

    if (milestone == RUNNING)
      Scorecard.update(scorecardUuid, { running_date: new Date() });

    ScorecardProgressApi.post(attrs)
      .then(function (response) {
        if (response.status == 200) {
          Scorecard.update(scorecardUuid, { milestone: milestone });
          callback && callback();
        }
        else
          !!errorCallback && errorCallback(response.error);
      });
  }
})();

export default scorecardMilestoneService;