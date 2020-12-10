import { environment } from '../config/environment';
import realm from '../db/schema';
import {downloadFileFromUrl, readFile} from '../services/local_file_system_service';
import {getDownloadPercentage} from './scorecard_detail_service';

const saveAudio = (index, indicators, updateDownloadPercentage, callback) => {
  if (index === indicators.length) {
    setTimeout(() => {
      callback(true);
    }, 5000)
    return;
  }

  const languageIndicators = indicators[index]['languages_indicators'];
  if (languageIndicators.length > 0)
    downloadFromLanguageIndicator(0, languageIndicators, indicators, updateDownloadPercentage, callback, index);
}

downloadFromLanguageIndicator = (index, languageIndicators, indicators, updateDownloadPercentage, callback, indicatorIndex) => {
  if (index === languageIndicators.length) {
    updateDownloadPercentage(getDownloadPercentage(indicators.length));
    saveAudio(indicatorIndex + 1, indicators, updateDownloadPercentage, callback);
    return;
  }

  const languageIndicator = languageIndicators[index];
  if (languageIndicator.audio != undefined || languageIndicator.audio != null) {
    const audioUrl = `${environment.domain}${languageIndicator.audio}`;
    _checkAndSave(audioUrl, languageIndicator, callback, () => {
      downloadFromLanguageIndicator(index + 1, languageIndicators, indicators, updateDownloadPercentage, callback, indicatorIndex);
    })
  }
}

const _checkAndSave = (audioUrl, languageIndicator, callback, saveAudioCallback) => {
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
    saveAudioCallback();
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