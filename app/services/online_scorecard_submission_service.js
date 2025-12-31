import Scorecard from '../models/Scorecard';
import { scorecardAttributes } from '../utils/scorecard_attributes_util';
import { getErrorType } from './api_service';

const onlineScorecardSubmissionService = (() => {
  return {
    draftSubmit,
  }

  async function draftSubmit({scorecardUuid, successCallback, errorCallback}) {
    const scorecard = Scorecard.find(scorecardUuid);
    let attrs = await scorecardAttributes(scorecard);
    console.log('*************************');
    console.log('=== scorecard attrs = ', attrs);
    
    this.scorecardApi.put(this.scorecard_uuid, attrs)
      .then(function (response) {
        if (response.status == 200)
          successCallback();
        else if (response.error)
          !!errorCallback && errorCallback(getErrorType(response.error.status));
      });
  }
})();

export default onlineScorecardSubmissionService;