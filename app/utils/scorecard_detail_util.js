import {
  scorecardDownloadSteps,
  scorecardDownloadAudioSteps
} from '../constants/scorecard_constant';

const getEachPhasePercentage = () => {
  return 1/scorecardDownloadSteps;
}

const getEachAudioPhasePercentage = () => {
  return 1/scorecardDownloadAudioSteps;
}

const getEachAudioFilePercentage = (numberOfAudio) => {
  const eachPhasePercentage = 1/scorecardDownloadSteps;

  return eachPhasePercentage / numberOfAudio;
}

export { getEachPhasePercentage, getEachAudioPhasePercentage, getEachAudioFilePercentage };