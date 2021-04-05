import realm from '../db/schema';
import { getEachPhasePercentage } from '../utils/scorecard_detail_util';

import { scorecardDownloadPhases } from '../constants/scorecard_constant';

import IndicatorService from './indicator_service';
import { save as saveCaf } from './caf_service';
import { save as saveRatingScale }  from './rating_scale_service';

import { LanguageIndicatorService } from './language_indicator_service';
import { LanguageRatingScaleService } from './language_rating_scale_service';


const find = (scorecardUuid) => {
  return realm.objects('ScorecardDownload').filtered(`scorecard_uuid == '${scorecardUuid}'`)[0];
}

const _create = (scorecardUuid, phase) => {
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

const _update = (scorecard, phase, updateDownloadProgress) => {
  const scorecardDownload = find(scorecard.uuid);

  if (scorecardDownload === undefined) {
    _create(scorecard.uuid, phase);
    return;
  }

  let downloadPhases = JSON.parse(scorecardDownload.step);

  if (downloadPhases[phase] === 'downloaded') {
    updateDownloadProgress();
    return;
  }

  downloadPhases[phase] = 'downloaded';

  const attrs = {
    scorecard_uuid: scorecard.uuid,
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

let _languageIndicatorService = null;
let _languageRatingScaleService = null;
let _indicatorService = null;

const download = (scorecard, audioLocale, updateDownloadProgress, errorCallback) => {
  _languageIndicatorService = new LanguageIndicatorService();
  _languageRatingScaleService = new LanguageRatingScaleService();
  _indicatorService = new IndicatorService();

  saveCaf(scorecard.uuid, scorecard.local_ngo_id,
    (isDownloaded, phase) => {
      const options = {
        isDownloaded,
        phase,
        scorecard,
        audioLocale,
      };

      _downloadSuccess(options, updateDownloadProgress, errorCallback, _downloadRatingScale);
    },
    errorCallback
  );
}

const _downloadRatingScale = (scorecard, audioLocale, updateDownloadProgress, errorCallback) => {
  saveRatingScale(scorecard.uuid, scorecard.program_id,
    (isDownloaded, phase) => {
      const options = {
        isDownloaded,
        phase,
        scorecard,
        audioLocale,
      };

      _downloadSuccess(options, updateDownloadProgress, errorCallback, _downloadIndicator);
    },
    errorCallback
  );
}

const _downloadIndicator = (scorecard, audioLocale, updateDownloadProgress, errorCallback) => {
  _indicatorService.saveIndicatorSection(scorecard.uuid, scorecard.facility_id,
    (isDownloaded, phase) => {
      const options = {
        isDownloaded,
        phase,
        scorecard,
        audioLocale,
      };

      _downloadSuccess(options, updateDownloadProgress, errorCallback, downloadLangIndicatorAudio);
    },
    errorCallback
  );
}

const _downloadIndicatorImage = (scorecard, audioLocale, updateDownloadProgress, errorCallback) => {
  _indicatorService.saveImage(scorecard.uuid,
    (isDownloaded, phase) => {
      const options = {
        isDownloaded,
        phase,
        scorecard,
        audioLocale,
      };

      _downloadSuccess(options, updateDownloadProgress, errorCallback, downloadLangIndicatorAudio);
    },
    errorCallback
  );
}

const downloadLangIndicatorAudio = (scorecard, audioLocale, updateDownloadProgress, errorCallback) => {
  if (!_languageIndicatorService)
    _languageIndicatorService = new LanguageIndicatorService();

  _languageIndicatorService.saveAudio(scorecard.uuid, audioLocale,
    (isDownloaded, phase, downloadPercentage) => {
      const options = {
        isDownloaded,
        phase,
        scorecard,
        audioLocale,
        downloadPercentage,
      };

      _downloadSuccess(options, updateDownloadProgress, errorCallback, _downloadLangRatingScaleAudio);
    },
    errorCallback
  );
}

const _downloadLangRatingScaleAudio = (scorecard, audioLocale, updateDownloadProgress, errorCallback) => {
  if (!_languageRatingScaleService)
    _languageRatingScaleService = new LanguageRatingScaleService();

  _languageRatingScaleService.saveAudio(scorecard.program_id, audioLocale,
    (isDownloaded, phase, downloadPercentage) => {
      const options = {
        isDownloaded,
        phase,
        scorecard,
        audioLocale,
        downloadPercentage,
      };

      _downloadSuccess(options, updateDownloadProgress, errorCallback, null);
    },
    errorCallback
  );
}

const _downloadSuccess = (options, updateDownloadProgress, errorCallback, downloadNextPhase) => {
  const { isDownloaded, scorecard, phase, audioLocale } = options;

  if (isDownloaded) {
    _update(scorecard, phase, updateDownloadProgress);

    if (downloadNextPhase)
      downloadNextPhase(scorecard, audioLocale, updateDownloadProgress, errorCallback);
  }
}

const stopDownload = () => {
  if (_indicatorService) {
    _languageIndicatorService.stopDownload()
    _languageRatingScaleService.stopDownload();
    _indicatorService.stopDownload();
  }

  _languageIndicatorService = null;
  _languageRatingScaleService = null;
  _indicatorService = null;
}


const deleteScorecardDownload = (scorecardUuid) => {
  const scorecardDownload = find(scorecardUuid);

  if (scorecardDownload != undefined) {
    realm.write(() => {
      realm.delete(scorecardDownload);
    });
  }
}

export {
  find,
  isPhaseDownloaded,
  isDownloaded,
  getDownloadPercentage,
  download,
  stopDownload,
  downloadLangIndicatorAudio,
  deleteScorecardDownload,
}