import { environment } from '../config/environment';
import realm from '../db/schema';
import {downloadFileFromUrl, readFile} from '../services/local_file_system_service';

const saveAudio = (indicators, callback) => {
  indicators.map((indicator) => {
    const languagesIndicators = indicator['languages_indicators'];
    if (languagesIndicators.length > 0) {
      languagesIndicators.map((languagesIndicator) => {
        if (languagesIndicator.audio != undefined || languagesIndicator.audio != null) {
          const audioUrl = `${environment.domain}${languagesIndicator.audio}`;
          _checkAndSave(audioUrl, languagesIndicator, indicator, callback);
        }
      });
    }
  });
}

const _checkAndSave = (audioUrl, languageIndicator, indicator, callback) => {
  let audioPath = audioUrl.split('/');
  const fileName = audioPath[audioPath.length - 1];

  // Start downloading
  readFile(fileName, async (isSuccess, response) => {
    if (response === 'file not found') {
      // File not found then start to download file
      https: downloadFileFromUrl(audioUrl, languageIndicator, async (isSuccess, response, localAudioFilePath) => {
        if (isSuccess) {
          _saveLocalAudioToLanguageIndicator(languageIndicator, localAudioFilePath);
          callback(true);
        }
        else {
          console.log('download failed = ', response);
          callback(false);
        }
      });
    }
    else {
      // File is already exist
      console.log('=== audio already exist ===');
      callback(true);
    }
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