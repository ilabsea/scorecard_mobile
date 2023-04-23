import DeviceInfo from 'react-native-device-info';
import Scorecard from '../models/Scorecard';
import ScorecardProgressApi from '../api/ScorecardProgressApi';
import { RUNNING, RENEWED } from '../constants/scorecard_constant';

const scorecardMilestoneService = (() => {
  return {
    updateMilestone
  }

  async function updateMilestone(params, data, callback, errorCallback) {
    const { scorecardUuid, milestone } = params;
    const scorecard = Scorecard.find(scorecardUuid);

    if (scorecard.milestone != RENEWED && (scorecard.milestone == milestone))
      return;

    if (milestone == RUNNING)
      Scorecard.update(scorecardUuid, { running_date: new Date() });

    ScorecardProgressApi.post(await _getScorecardAttrs(params, data, scorecard.conducted_date))
      .then(function (response) {
        if (response.status == 200) {
          const attrs = { milestone: milestone }
          if (milestone == RUNNING)
            attrs['running_status_uploaded'] = true;

          Scorecard.update(scorecardUuid, attrs);
          callback && callback();
        }
        else
          !!errorCallback && errorCallback(response.error);
      });
  }

  // private method
  async function _getScorecardAttrs(params, data, conducatedDate) {
    const { scorecardUuid, milestone } = params;
    let attrs = {
      scorecard_progress: {
        scorecard_uuid: scorecardUuid,
        status: milestone,
        conducated_at: conducatedDate
      }
    };

    await DeviceInfo.getAndroidId().then((androidId) => {
      attrs.scorecard_progress.device_id = androidId;
    });

    if (data)
      attrs = {...attrs, ...data};

    return attrs;
  }
})();

export default scorecardMilestoneService;