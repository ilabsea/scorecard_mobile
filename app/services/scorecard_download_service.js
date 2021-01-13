import realm from '../db/schema';
import { getEachPhasePercentage } from '../utils/scorecard_detail_util';
import {
  scorecardDownloadPhases,
  indicatorPhase,
  languageIndicatorPhase,
  audioPhase,
} from '../constants/scorecard_constant';

const find = (scorecardUuid) => {
  return realm.objects('ScorecardDownload').filtered(`scorecard_uuid == '${scorecardUuid}'`)[0];
}

const create = (scorecardUuid, phase) => {
  let attrs = {
    scorecard_uuid: scorecardUuid,
    finished: false,
    download_percentage: getEachPhasePercentage(),
  };
  let phases = scorecardDownloadPhases;
  phases[phase] = 'downloaded';

  attrs['step'] = JSON.stringify(phases);

  realm.write(() => {
    realm.create('ScorecardDownload', attrs);
  });
}

const update = (scorecardUuid, phase, updateDownloadProgress) => {
  const scorecardDownload = find(scorecardUuid);
  if (scorecardDownload === undefined) {
    create(scorecardUuid, phase);
    return;
  }

  let downloadPhases = JSON.parse(scorecardDownload.step);
  downloadPhases[phase] = 'downloaded';

  const attrs = {
    scorecard_uuid: scorecardUuid,
    step: JSON.stringify(downloadPhases),
    download_percentage: _getUpdatedDownloadPercentage(scorecardDownload.download_percentage),
    finished: _isAllPhaseDownloaded(downloadPhases),
  };

  realm.write(() => {
    realm.create('ScorecardDownload', attrs, 'modified');
  });

  updateDownloadProgress();
}

const isPhaseDownloaded = (scorecardUuid, phase) => {
  const scorecardDownload = find(scorecardUuid);
  if (scorecardDownload === undefined)
    return false;

  const downloadPhase = JSON.parse(scorecardDownload.step);
  return downloadPhase[phase] === 'downloaded' ? true : false;
}

const isDownloaded = (scorecardUuid) => {
  const scorecardDownload = find(scorecardUuid);
  return scorecardDownload != undefined ? scorecardDownload.finished : false;
}

// Indicator section contains indicator, language_indicator, and audio
const isInidcatorSectionDownloaded = (scorecardUuid) => {
  return isPhaseDownloaded(scorecardUuid, indicatorPhase) &&
         isPhaseDownloaded(scorecardUuid, languageIndicatorPhase) &&
         isPhaseDownloaded(scorecardUuid, audioPhase);
}

const getDownloadPercentage = (scorecardUuid) => {
  const scorecardDownload = find(scorecardUuid);
  if (scorecardDownload === undefined)
    return 0;

  return scorecardDownload.download_percentage;
}

const _getUpdatedDownloadPercentage = (currentDownloadPercentage) => {
  if (currentDownloadPercentage >= 1)
    return 1;

  return currentDownloadPercentage + getEachPhasePercentage();
}

const _isAllPhaseDownloaded = (downloadPhase) => {
  for (let phase in downloadPhase) {
    if (downloadPhase[phase] === 'failed')
      return false;
  }

  return true;
}

export {
  find,
  update,
  isPhaseDownloaded,
  isInidcatorSectionDownloaded,
  isDownloaded,
  getDownloadPercentage,
}