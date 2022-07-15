import DeviceInfo from 'react-native-device-info';
import Scorecard from '../models/Scorecard';
import ScorecardProgressApi from '../api/ScorecardProgressApi';
import { RUNNING, RENEWED } from '../constants/milestone_constant';
import { sendRequestToApi } from './api_service';

const scorecardMilestoneService = (() => {
  return {
    updateMilestone
  }

  function updateMilestone(params, data, callback, errorCallback) {
    const { scorecardUuid, milestone } = params;
    const scorecard = Scorecard.find(scorecardUuid);

    if (scorecard.milestone != RENEWED && (scorecard.milestone == milestone))
      return;

    if (milestone == RUNNING)
      Scorecard.update(scorecardUuid, { running_date: new Date() });

    sendRequestToApi(async () => {
      return ScorecardProgressApi.post(await _getScorecardAttrs(params, data));
    }, (response) => {
      Scorecard.update(scorecardUuid, { milestone: milestone });
      !!callback && callback();
    }, (error) => !!errorCallback && errorCallback(error));
  }

  // private method
  async function _getScorecardAttrs(params, data) {
    const { scorecardUuid, milestone } = params;
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

    return attrs;
  }
})();

export default scorecardMilestoneService;