import { environment } from '../config/environment';
import realm from '../db/schema';
import {downloadFileFromUrl, readFile} from '../services/local_file_system_service';
import {getDownloadPercentage} from './scorecard_detail_service';

const saveAudio = (index, indicators, updateDownloadPercentage, callback) => {
  if (index === indicators.length) {
    callback(true);
    return;
  }

  const languageIndicators = indicators[index]['languages_indicators'];
  if (languageIndicators.length > 0)
    downloadLanguageIndicatorAudio(0, languageIndicators, indicators, updateDownloadPercentage, callback, () => {
      saveAudio(index + 1, indicators, updateDownloadPercentage, callback);
    });
}

downloadLanguageIndicatorAudio = (index, languageIndicators, indicators, updateDownloadPercentage, callback, callbackSaveAudio) => {
  if (index === languageIndicators.length) {
    updateDownloadPercentage(getDownloadPercentage(indicators.length));
    callbackSaveAudio();
    return;
  }

  const languageIndicator = languageIndicators[index];
  if (languageIndicator.audio != undefined || languageIndicator.audio != null) {
    const audioUrl = `${environment.domain}${languageIndicator.audio}`;
    _checkAndSave(audioUrl, languageIndicator, callback, () => {
      downloadLanguageIndicatorAudio(index + 1, languageIndicators, indicators, updateDownloadPercentage, callback, callbackSaveAudio);
    })
  }
}

const _checkAndSave = (audioUrl, languageIndicator, callback, callbackDownload) => {
  let audioPath = audioUrl.split('/');
  const fileName = audioPath[audioPath.length - 1];

  // Start downloading
  readFile(fileName, async (isSuccess, response) => {
    if (response === 'file not found') {
      // File not found then start to download file
      https: downloadFileFromUrl(audioUrl, languageIndicator, async (isSuccess, response, localAudioFilePath) => {
        if (isSuccess)
          _saveLocalAudioToLanguageIndicator(languageIndicator, localAudioFilePath);
        else {
          console.log('download failed = ', response);
          callback(false);
        }
      });
    }
    else {
      // File is already exist
      console.log('=== audio already exist ===');
      // callback(true);
    }
    callbackDownload();
  });
}

const _saveLocalAudioToLanguageIndicator = (languageIndicator, localAudioFilePath) => {
  const attrs = {
    id: languageIndicator.id.toString(),
    local_audio: localAudioFilePath,
  };
  realm.write(() => {
    realm.create('LanguageIndicator', attrs, 'modified');
  });
}

const getAudioFilename = (indicatorId, languageCode, filename) => {
  return `${indicatorId}_${languageCode}_${filename}`;
}

export {saveAudio, getAudioFilename};