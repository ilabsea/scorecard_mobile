// import {
//  scorecardDownloadSteps
// } from '../constants/scorecard_constant';

// const getEachPhasePercentage = () => {
//   return 1/scorecardDownloadSteps;
// }

// export { getEachPhasePercentage };

import {
  scorecardInfoDownloadSteps,
  scorecardMediaDownloadSteps,
} from '../constants/scorecard_constant';

const getEachInfoPhasePercentage = () => {
  return 1/scorecardInfoDownloadSteps;
}

const getEachMediaPhasePercentage = () => {
  return 1/scorecardMediaDownloadSteps;
}

export { getEachInfoPhasePercentage, getEachMediaPhasePercentage };