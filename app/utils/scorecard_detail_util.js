import { scorecardDownloadSteps } from '../constants/scorecard_constant';

const getEachPhasePercentage = () => {
  return 1/scorecardDownloadSteps;
}

export { getEachPhasePercentage };