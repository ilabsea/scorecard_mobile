import {
  scorecardDownloadSteps,
} from '../constants/scorecard_constant';

const getEachPhasePercentage = () => {
  return 1/scorecardDownloadSteps;
}

const getEachAudioFilePercentage = (numberOfAudio) => {
  const eachPhasePercentage = 1/scorecardDownloadSteps;

  return eachPhasePercentage / numberOfAudio;
}

export { getEachPhasePercentage, getEachAudioFilePercentage };