import { environment } from '../config/environment';
import Scorecard from '../models/Scorecard';

const criteriaHelper = (() => {
  return {
    allowTourTip
  }

  function allowTourTip(scorecardUuid) {
    return (!Scorecard.tourTipShown(scorecardUuid) && environment.enableTourTip);
  }
})();

export default criteriaHelper;