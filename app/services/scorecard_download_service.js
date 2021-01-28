import realm from '../db/schema';
import {
  getEachInfoPhasePercentage,
  getEachMediaPhasePercentage
} from '../utils/scorecard_detail_util';
import {
  scorecardInfoDownloadPhases,
  scorecardAudioDownloadPhases,
  // indicatorPhase,
  // languageIndicatorPhase,
  // audioPhase,
  AUDIO,
} from '../constants/scorecard_constant';

const find = (scorecardUuid) => {
  return realm.objects('ScorecardDownload').filtered(`scorecard_uuid == '${scorecardUuid}'`)[0];
}

const create = (scorecardUuid, phase, programId) => {
  let attrs = {
    scorecard_uuid: scorecardUuid,
    info_download_percentage: getEachInfoPhasePercentage(),
    audio_step: scorecardAudioDownloadPhases(programId),
    audio_download_percentage: 0,
  };

  let infoPhases = scorecardInfoDownloadPhases;
  infoPhases[phase] = 'downloaded';

  attrs['info_step'] = JSON.stringify(infoPhases);

  realm.write(() => {
    realm.create('ScorecardDownload', attrs);
  });
}

const updateDownloadInfoSection = (options, updateDownloadProgress) => {
  const { scorecard_uuid, program_id, phase } = options;
  const scorecardDownload = find(scorecard_uuid);

  if (scorecardDownload === undefined) {
    create(scorecard_uuid, phase, program_id);
    return;
  }

  let downloadPhases = JSON.parse(scorecardDownload.info_step);
  if (downloadPhases[phase] === 'downloaded') {
    updateDownloadProgress();
    return;
  }

  downloadPhases[phase] = 'downloaded';
  let attrs = {
    scorecard_uuid: scorecard_uuid,
    info_step: JSON.stringify(downloadPhases),
    info_download_percentage:  _getUpdatedDownloadPercentage(scorecardDownload.info_download_percentage, getEachInfoPhasePercentage()),
  };

  realm.write(() => {
    realm.create('ScorecardDownload', attrs, 'modified');
  });

  updateDownloadProgress();
}

const updateDownloadAudioSection = (options, updateDownloadProgress) => {
  const { scorecard_uuid, program_id, phase } = options;
  const scorecardDownload = find(scorecard_uuid);

  if (scorecardDownload === undefined) {
    create(scorecard_uuid, phase, program_id);
    return;
  }

  let downloadPhases = JSON.parse(scorecardDownload.audio_step);
  if (downloadPhases[phase] === 'downloaded') {
    updateDownloadProgress();
    return;
  }

  downloadPhases[phase] = 'downloaded';
  let attrs = {
    scorecard_uuid: scorecard_uuid,
    audio_step: JSON.stringify(downloadPhases),
    audio_download_percentage:  _getUpdatedDownloadPercentage(scorecardDownload.audio_download_percentage, getEachInfoPhasePercentage()),
  };

  realm.write(() => {
    realm.create('ScorecardDownload', attrs, 'modified');
  });

  updateDownloadProgress();
}

// const update = (options, updateDownloadProgress) => {
//   const { scorecard_uuid, program_id, phase, type, languageCode } = options;
//   const scorecardDownload = find(scorecard_uuid);

//   if (scorecardDownload === undefined) {
//     create(scorecard_uuid, phase, program_id);
//     return;
//   }

//   let downloadPhases = type === AUDIO ? JSON.parse(scorecardDownload.audio_step) : JSON.parse(scorecardDownload.info_step);
//   if (downloadPhases[phase] === 'downloaded') {
//     updateDownloadProgress();
//     return;
//   }

//   downloadPhases[phase] = 'downloaded';

//   let attrs = { scorecard_uuid: scorecard_uuid };

//   if (type === AUDIO) {
//     attrs['audio_step'] = JSON.stringify(downloadPhases);
//     attrs['audio_download_percentage'] = _getUpdatedDownloadPercentage(scorecardDownload.media_download_percentage, getEachMediaPhasePercentage());
//   }
//   else {
//     attrs['info_step'] = JSON.stringify(downloadPhases);
//     attrs['info_download_percentage'] = _getUpdatedDownloadPercentage(scorecardDownload.info_download_percentage, getEachInfoPhasePercentage());
//   }

//   realm.write(() => {
//     realm.create('ScorecardDownload', attrs, 'modified');
//   });

//   updateDownloadProgress();
// }

const isPhaseDownloaded = (scorecardUuid, phase) => {
  const scorecardDownload = find(scorecardUuid);
  if (scorecardDownload === undefined)
    return false;

  const downloadPhase = JSON.parse(scorecardDownload.info_step);

  return downloadPhase[phase] === 'downloaded' ? true : false;
}

const isInfoSectionDownloaded = (scorecardUuid) => {
  const scorecardDownload = find(scorecardUuid);
  if (scorecardDownload === undefined)
    return false;

  const infoStep = JSON.parse(scorecardDownload.info_step);
  Object.keys(infoStep).map((step) => {
    if (infoStep[step] === 'failed')
      return false;
  });

  return true;
}

const getDownloadPercentage = (scorecardUuid, type) => {
  const scorecardDownload = find(scorecardUuid);
  if (scorecardDownload === undefined)
    return 0;

  return type === AUDIO ? scorecardDownload.audio_download_percentage : scorecardDownload.info_download_percentage;
}

const _getUpdatedDownloadPercentage = (currentDownloadPercentage, eachPhasePercentage) => {
  if (currentDownloadPercentage >= 1)
    return 1;

  return currentDownloadPercentage + eachPhasePercentage;
}

const isAudioLanguageDownloaded = (scorecardUuid, languageCode) => {
  const scorecardDownload = find(scorecardUuid);

  // if (scorecardDownload === undefined)
  if (!scorecardDownload)
    return false;

  console.log('download lang indi == ', scorecardDownload.audio_step);
  const audioStep = JSON.parse(scorecardDownload.audio_step);

  const downloadedLangIndicator = audioStep.langIndicatorAudioPhase;
  const downloadedLangRatingScale = audioStep.langRatingScaleAudioPhase;

  if (downloadedLangIndicator[languageCode] === 'failed' || downloadedLangRatingScale[languageCode] === 'failed')
    return false;

  return true;
}

export {
  find,
  updateDownloadInfoSection,
  isPhaseDownloaded,
  isInfoSectionDownloaded,
  getDownloadPercentage,
  isAudioLanguageDownloaded,
  updateDownloadAudioSection,
} 