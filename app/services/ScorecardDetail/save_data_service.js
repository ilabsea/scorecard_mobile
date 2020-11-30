import AsyncStorage from '@react-native-community/async-storage';
import { environment } from '../../config/environment';
import realm from '../../db/schema';
import {downloadFileFromUrl, readFile} from '../../services/local_storage_service';
import {environment} from '../../config/environment';

const _getScorecardUUID = async () => {
  return await AsyncStorage.getItem('SELECTED_SCORECARD_UUID');
};

const _saveDataToLocalStorage = (schema, data) => {
  realm.write(() => {
    realm.create(schema, data, 'modified');
  });
};

const _clearDataFromLocalStorage = (schema, scorecardUUID) => {
  realm.write(() => {
    const data = realm.objects(schema).filtered(`scorecard_uuid = '${scorecardUUID}'`);
    realm.delete(data);
  });
};

const saveIndicator = async (indicators, callback) => {
  const scorecardUUID = await _getScorecardUUID();
  _clearDataFromLocalStorage('Indicator', scorecardUUID);
  indicators.map((indicator) => {
    const indicatorSet = {
      id: indicator.id,
      name: indicator.name,
      facility_id: indicator.categorizable.id,
      scorecard_uuid: scorecardUUID,
    };
    _saveDataToLocalStorage('Indicator', indicatorSet);
  });
  callback(true);
};

const saveLanguageIndicator = async (indicators, localAudioFilePath) => {
  const scorecardUUID = await _getScorecardUUID();
  indicators.map(indicator => {
    const languagesIndicators = indicator['languages_indicators'];
    if (languagesIndicators.length > 0) {
      languagesIndicators.map((languagesIndicator) => {
        const languageIndicator = {
          id: languagesIndicator.id,
          content: languagesIndicator.content,
          audio: languagesIndicator.audio != null ? languagesIndicator.audio : '',
          language_code: languagesIndicator['language_code'],
          scorecard_uuid: scorecardUUID,
          indicator_id: indicator.id.toString(),
          local_audio: localAudioFilePath,
        };
        _saveDataToLocalStorage('LanguageIndicator', languageIndicator);
      });
    }
  });
}

const saveCaf = async (cafs, callback) => {
  const scorecardUUID = await _getScorecardUUID();
  _clearDataFromLocalStorage('Caf', scorecardUUID);
  cafs.map((caf) => {
    const cafSet = {
      id: caf.id,
      name: caf.name,
      local_ngo_id: caf['local_ngo_id'],
      scorecard_uuid: scorecardUUID,
    };
    _saveDataToLocalStorage('Caf', cafSet);
  });
  callback(true);
};

const saveAudio = (indicators, callback) => {
  indicators.map((indicator) => {
    const languagesIndicators = indicator['languages_indicators'];
    if (languagesIndicators.length > 0) {
      languagesIndicators.map((languagesIndicator) => {
        if (languagesIndicator.audio != undefined || languagesIndicator.audio != null) {
          const audioUrl = `${environment.domain}${languagesIndicator.audio}`;
          _checkAndSave(audioUrl, indicators, callback);
        }
      });
    }
  });
}

const _checkAndSave = (audioUrl, indicators, callback) => {
  let audioPath = audioUrl.split('/');
  const fileName = audioPath[audioPath.length - 1];

  // Start downloading
  readFile(fileName, async (isSuccess, response) => {
    if (response === 'file not found') {
      // File not found then start to download file
      https: downloadFileFromUrl(audioUrl, async (isSuccess, response, localAudioFilePath) => {
        if (isSuccess) {
          saveLanguageIndicator(indicators, localAudioFilePath);
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

export {saveIndicator, saveLanguageIndicator, saveCaf, saveAudio};