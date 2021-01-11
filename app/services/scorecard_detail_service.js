import realm from '../db/schema';
import {
  update as updateScorecardDownload,
  isPhaseDownloaded,
} from './scorecard_download_service';

const handleSaveScorecardPhase = (scorecardUuid, phase, updateDownloadProgress, handleSavePhase) => {
  if (isPhaseDownloaded(scorecardUuid, phase)) {
    updateDownloadProgress();
    return;
  }

  handleSavePhase();
}

const saveCallback = (scorecardUuid, phase, isDownloaded, updateDownloadProgress) => {
  if (isDownloaded)
    updateScorecardDownload(scorecardUuid, phase, updateDownloadProgress);
}

const cancelApiRequest = (indicatorApi, cafApi, ratingScaleService) => {
  if (this.indicatorApi != null)
    indicatorApi.cancelRequest();

  if (this.cafApi != null)
    cafApi.cancelRequest();

  if(ratingScaleService.ratingScaleApi != null)
    ratingScaleService.ratingScaleApi.cancelRequest();
}

const getScorecardDetail = async (scorecardUuid) => {
  return await realm.objects('Scorecard').filtered(`uuid == '${scorecardUuid}'`)[0];
}

export {
  handleSaveScorecardPhase,
  cancelApiRequest,
  getScorecardDetail,
  saveCallback,
};