import realm from '../db/schema';
import {saveIndicator} from './indicator_service';
import {saveLanguageIndicator} from './language_indicator_service';
import { save as saveProgramLanguage } from './program_language_service';
import scorecardItem from '../constants/scorecard_constant';
import { getEachSectionPercentage } from '../utils/scorecard_detail_util';

const handleSaveIndicator = (options, isIndicatorDownloaded, callback) => {
  if (isIndicatorDownloaded) {
    options.updateDownloadProgress(getEachSectionPercentage());
    return;
  }

  saveIndicator(options.scorecardUuid, options.indicators, options.updateDownloadProgress,
    (isIndicatorDownloaded) => {
      callback(isIndicatorDownloaded);
    }
  );
}

const handleSaveLanguageIndicator = (options, isLanguageIndicatorDownloaded, callback) => {
  if (isLanguageIndicatorDownloaded) {
    options.updateDownloadProgress(getEachSectionPercentage());
    return;
  }

  saveLanguageIndicator(options.scorecardUuid, options.indicators, options.updateDownloadProgress,
    (isDownloaded) => {
      callback(isDownloaded);
    }
  );
}

const handleSaveAudio = (options, isAllAudioDownloaded, audioService, callback) => {
  if (isAllAudioDownloaded) {
    options.updateDownloadProgress(getEachSectionPercentage());
    return;
  }

  audioService.saveAudio(0, options.indicators, options.updateDownloadProgress,
    (isDownloaded) => {
      callback(isDownloaded);
    }
  );
}

const handleSaveRatingScale = (programId, ratingScaleService, updateDownloadProgress, callback) => {
  ratingScaleService.saveData(programId, updateDownloadProgress,
    (isDownloaded) => {
      callback(isDownloaded);
    }
  );
}

const handleSaveProgramLanguage = (programId, updateDownloadProgress, callback) => {
  saveProgramLanguage(programId, updateDownloadProgress, (isDownloaded) => {
    callback(isDownloaded)
  });
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

const updateScorecardDownloadStatus = (scorecardUuid) => {
  const attrs = {
    uuid: scorecardUuid,
    downloaded: true,
  };
  realm.write(() => {
    realm.create('Scorecard', attrs, 'modified');
  });
}

const updateDownloadedField = (scorecardUuid, field, isDownloaded) => {
  if (!isDownloaded)
    return;

  let attrs = { uuid: scorecardUuid };
  attrs[scorecardItem[field]] = true;

  realm.write(() => {
    realm.create('Scorecard', attrs, 'modified');
  });
}

const isFieldDownloaded = (scorecardUuid, field) => {
  const fieldName = scorecardItem[field];
  const scorecard = realm.objects('Scorecard').filtered(`uuid == '${scorecardUuid}'`)[0];

  if (scorecard != undefined)
    return scorecard[fieldName];

  return false;
}

const isDownloaded = (scorecardUuid) => {
  const scorecard = realm.objects('Scorecard').filtered(`uuid == '${scorecardUuid}'`)[0];
  return scorecard.downloaded;
}

const isResumeDownload = (scorecard) => {
  if (scorecard.indicator_downloaded
    || scorecard.languge_indicator_downloaded
    || scorecard.caf_downloaded
    || scorecard.audio_downloaded
    || scorecard.rating_scale_downloaded
    || scorecard.program_language_downloaded
  )
    return true;

  return false;
}

export {
  handleSaveIndicator,
  handleSaveLanguageIndicator,
  handleSaveAudio,
  handleSaveRatingScale,
  handleSaveProgramLanguage,
  cancelApiRequest,
  getScorecardDetail,
  updateScorecardDownloadStatus,
  updateDownloadedField,
  isFieldDownloaded,
  isDownloaded,
  isResumeDownload,
};