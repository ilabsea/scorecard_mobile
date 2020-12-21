import { environment } from '../config/environment';
import realm from '../db/schema';
import {downloadFileFromUrl, readFile} from '../services/local_file_system_service';
import {getDownloadPercentage} from './scorecard_detail_service';

class AudioService {
  constructor(isStopDownload) {
    this.isStopDownload = isStopDownload;
  }

  saveAudio = (index, indicators, updateDownloadPercentage, callback) => {
    if (index === indicators.length) {
      callback(true);
      return;
    }

    const languageIndicators = indicators[index]['languages_indicators'];
    if (languageIndicators.length > 0)
      this._downloadLanguageIndicatorAudio(0, languageIndicators, indicators, updateDownloadPercentage, callback, () => {
        this.saveAudio(index + 1, indicators, updateDownloadPercentage, callback);
      });
  }

  _downloadLanguageIndicatorAudio = (index, languageIndicators, indicators, updateDownloadPercentage, callback, callbackSaveAudio) => {
    if (index === languageIndicators.length) {
      updateDownloadPercentage(getDownloadPercentage(indicators.length));
      callbackSaveAudio();
      return;
    }

    if (this.isStopDownload)
      return;

    const languageIndicator = languageIndicators[index];
    if (languageIndicator.audio != undefined || languageIndicator.audio != null) {
      const audioUrl = `${environment.domain}${languageIndicator.audio}`;
      this._checkAndSave(audioUrl, languageIndicator, callback, () => {
        this._downloadLanguageIndicatorAudio(index + 1, languageIndicators, indicators, updateDownloadPercentage, callback, callbackSaveAudio);
      })
    }
  }

  _checkAndSave = (audioUrl, languageIndicator, callback, callbackDownload) => {
    let audioPath = audioUrl.split('/');
    let fileName = audioPath[audioPath.length - 1];
    fileName = getAudioFilename(languageIndicator.id, languageIndicator.language_code, fileName);
    // Start downloading
    readFile(fileName, async (isSuccess, response) => {
      if (response === 'file not found') {
        // File not found then start to download file
        downloadFileFromUrl(audioUrl, languageIndicator, async (isSuccess, response, localAudioFilePath) => {
          if (isSuccess)
            this._saveLocalAudioToLanguageIndicator(languageIndicator, localAudioFilePath, callbackDownload);
          else {
            console.log('download failed = ', response);
            callback(false);
          }
        });
      }
      else {
        // File is already exist
        console.log('=== audio already exist ===');
        callbackDownload();
      }
    });
  }

  _saveLocalAudioToLanguageIndicator = (languageIndicator, localAudioFilePath, callbackDownload) => {
    const attrs = {
      id: languageIndicator.id.toString(),
      local_audio: localAudioFilePath,
    };
    realm.write(() => {
      realm.create('LanguageIndicator', attrs, 'modified');
    });
    callbackDownload();
  }
}

const getAudioFilename = (indicatorId, languageCode, filename) => {
  return `${indicatorId}_${languageCode}_${filename}`;
}

export {AudioService, getAudioFilename};