import realm from '../db/schema';
import {
  getEachPhasePercentage,
  getEachAudioPhasePercentage,
} from '../utils/scorecard_detail_util';
import {
  scorecardDownloadPhases,
  indicatorPhase,
  languageIndicatorPhase,
  audioPhase,
  scorecardAudioDownloadPhases,
  langIndicatorAudioPhase,
  langRatingScaleAudioPhase,
} from '../constants/scorecard_constant';

import {
  saveIndicatorSection,
  IndicatorService,
} from './indicator_service';
import { save as saveCaf } from './caf_service';
import { save as saveRatingScale }  from './rating_scale_service';

import { LanguageIndicatorService } from './language_indicator_service';
import { LanguageRatingScaleService } from './language_rating_scale_service';

const find = (scorecardUuid) => {
  return realm.objects('ScorecardDownload').filtered(`scorecard_uuid == '${scorecardUuid}'`)[0];
}

const create = (scorecardUuid, programId, phase) => {
  let attrs = {
    scorecard_uuid: scorecardUuid,
    finished: false,
    download_percentage: getEachPhasePercentage(),
    audio_step: scorecardAudioDownloadPhases(programId),
  };
  let phases = scorecardDownloadPhases;
  phases[phase] = 'downloaded';

  attrs['step'] = JSON.stringify(phases);

  realm.write(() => {
    realm.create('ScorecardDownload', attrs);
  });
}

const update = (options, phase, updateDownloadProgress) => {
  const { scorecard, audioLocale } = options;
  const scorecardDownload = find(scorecard.uuid);

  if (scorecardDownload === undefined) {
    create(scorecard.uuid, scorecard.program_id, phase);
    return;
  }

  let downloadPhases = JSON.parse(scorecardDownload.step);
  let audioDownloadPhases = JSON.parse(scorecardDownload.audio_step);

  if (_isAudioPhase(phase)) {
    audioDownloadPhases[langIndicatorAudioPhase][audioLocale] = 'downloaded';
    audioDownloadPhases[langRatingScaleAudioPhase][audioLocale] = 'downloaded';

    const attrs = {
      scorecard_uuid: scorecard.uuid,
      audio_step: JSON.stringify(audioDownloadPhases),
    };

    realm.write(() => {
      realm.create('ScorecardDownload', attrs, 'modified');
    });
  }

  if (downloadPhases[phase] === 'downloaded') {
    updateDownloadProgress(getEachAudioPhasePercentage());
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

  updateDownloadProgress(getEachAudioPhasePercentage());
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
  saveIndicatorSection(scorecard.uuid, scorecard.facility_id,
    (isDownloaded, phase) => {
      const options = {
        isDownloaded,
        phase,
        scorecard,
        audioLocale,
      };

      _downloadSuccess(options, updateDownloadProgress, errorCallback, _downloadIndicatorImage);
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
  if (!_languageIndicatorService) {
    _languageIndicatorService = new LanguageIndicatorService();
    _languageRatingScaleService = new LanguageRatingScaleService();
    _indicatorService = new IndicatorService();
  }

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

  if (!isDownloaded && _isAudioPhase(phase) && options.downloadPercentage) {
    updateDownloadProgress(options.downloadPercentage);
    return;
  }

  if (isDownloaded) {
    update(options, phase, updateDownloadProgress);

    if (downloadNextPhase)
      downloadNextPhase(scorecard, audioLocale, updateDownloadProgress, errorCallback);
  }
}

const stopDownload = () => {
  if (_languageIndicatorService) {
    _languageIndicatorService.stopDownload()
    _languageRatingScaleService.stopDownload();
    _indicatorService.stopDownload();
  }

  _languageIndicatorService = null;
  _languageRatingScaleService = null;
  _indicatorService = null;
}

const isAudioLanguageDownloaded = (scorecardUuid, languageCode) => {
  const scorecardDownload = find(scorecardUuid);

  if (!scorecardDownload)
    return false;

  const audioStep = JSON.parse(scorecardDownload.audio_step);
  const downloadedLangIndicator = audioStep[langIndicatorAudioPhase];
  const downloadedLangRatingScale = audioStep[langRatingScaleAudioPhase];

  if (downloadedLangIndicator[languageCode] === 'failed' || downloadedLangRatingScale[languageCode] === 'failed')
    return false;

  return true;
}

const _isAudioPhase = (phase) => {
  if (phase == langIndicatorAudioPhase || phase == langRatingScaleAudioPhase)
    return true;

  return false;
}

export {
  find,
  update,
  isPhaseDownloaded,
  isInidcatorSectionDownloaded,
  isDownloaded,
  getDownloadPercentage,
  download,
  stopDownload,
  isAudioLanguageDownloaded,
  downloadLangIndicatorAudio,
}