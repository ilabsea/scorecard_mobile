import { environment } from '../config/environment';
import {
  downloadFileFromUrl,
  isFileExist,
} from '../services/local_file_system_service';

import { getEachAudioFilePercentage } from '../utils/scorecard_detail_util';

// options parameter contains items, type, and phase
const downloadAudio = (index, options, successCallback, errorCallback, storeAudioUrl) => {
  const { items, type, phase } = options;
  const eachFilePercentage = getEachAudioFilePercentage(items.length);

  if (index === items.length) {
    successCallback(true, phase, null);
    return;
  }

  const item = items[index];
  if (item.audio) {
    const audioUrl = `${environment.domain}${item.audio}`;
    const itemOptions = {
      audioUrl: audioUrl,
      item: item,
      type: type,
    };

    _checkAndSave(itemOptions, errorCallback, storeAudioUrl, () => {
      successCallback(false, phase, eachFilePercentage);
      downloadAudio(index + 1, options, successCallback, errorCallback, storeAudioUrl);
    })
  }
  else {
    successCallback(false, phase, eachFilePercentage);
    downloadAudio(index + 1, options, successCallback, errorCallback, storeAudioUrl);
  }
}

async function _checkAndSave(options, errorCallback, storeAudioUrl, callbackDownload) {
  const { audioUrl, item, type } = options;

  let audioPath = audioUrl.split('/');
  let filename = audioPath[audioPath.length - 1];
  filename = _getAudioFilename(type, item.id, item.language_code, filename);

  const isAudioExist = await isFileExist(filename)

  // File is already exist
  if (isAudioExist)
    callbackDownload();

  // File not found then start to download file
  else {
    downloadFileFromUrl(audioUrl, filename,
      (isSuccess, response, localAudioFilePath) => {
        if (isSuccess)
          storeAudioUrl(item, localAudioFilePath, callbackDownload);
        else {
          console.log('Error download file == ', response);
          errorCallback();
        }
      }
    );
  }
}

function _getAudioFilename(type, dependentId, languageCode, filename) {
  return `${type}_${dependentId}_${languageCode}_${filename}`;
}

export { downloadAudio };