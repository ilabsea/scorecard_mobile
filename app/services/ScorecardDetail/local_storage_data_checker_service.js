import AsyncStorage from '@react-native-community/async-storage';
import realm from '../../db/schema';
import {readAllFiles} from '../local_storage_service';

const _getuuid = async () => {
  let scorecard = await AsyncStorage.getItem('SCORECARD_DETAIL');
  scorecard = JSON.parse(scorecard);
  return scorecard.uuid;
}

const isIndicatorDownloaded = async (apiIndicators) => {
  const indicators = await _getDataFromLocalStorage('Indicator');
  return indicators.length === apiIndicators.length ? true : false;
};

const isCafDownloaded = async (apiCafs) => {
  const cafs = await _getDataFromLocalStorage('Caf');
  return cafs.length === apiCafs.length ? true : false;
};

const CheckAllAudioDownloaded = async (indicators, callback) => {
  let audioFilesName = _getLangIndicatorAudios(indicators);
  let downloadedFiles = [];
  readAllFiles(async (isSuccess, response) => {
    if (isSuccess) {
      downloadedFiles = await response;

      if (audioFilesName.length === 0)
        callback(true)
      else
        callback(_isAudioDownloaded(downloadedFiles, audioFilesName));
    }
  });
};

const _getLangIndicatorAudios = (indicators) => {
  let files = [];
  indicators.map(indicator => {
    const langIndicators = indicator['languages_indicators'];
    langIndicators.map((langIndicator) => {
      if (langIndicator.audio != null && langIndicator.audio != '')
        files.push(langIndicator.audio);
    });
  });

  return files;
}

const _isAudioDownloaded = (downloadedFiles, audioFilesName) => {
  const fileCount = audioFilesName.length;
  let downloadedFileCount = 0;

  for (let i=0; i<audioFilesName.length; i++) {
    const filePath = audioFilesName[i].split("/");
    const fileName = filePath[filePath.length - 1];
    for (let j=0; j<downloadedFiles.length; j++) {
      if (fileName === downloadedFiles[j].name) {
        downloadedFileCount++;
        break;
      }
    }
  }

  return fileCount === downloadedFileCount ? true : false;
}

const _getDataFromLocalStorage = async (schema) => {
  const uuid = await _getuuid();
  const realmData = realm.objects(schema).filtered('uuid = "' + uuid + '"');
  let data = JSON.stringify(realmData);
  return JSON.parse(data);
}

export {isIndicatorDownloaded, isCafDownloaded, CheckAllAudioDownloaded};