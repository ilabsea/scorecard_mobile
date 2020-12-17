import realm from '../db/schema';
import RatingScaleApi from '../api/RatingScaleApi';
import {readFile} from '../services/local_file_system_service';
import {getAudioFilename} from './audio_service';
import { environment } from '../config/environment';
import RNFS from 'react-native-fs';
import {getDownloadPercentage} from './scorecard_detail_service';

const ratingScaleService = (() => {
  return {
    saveData
  }

  async function saveData(programId, updateDownloadPercentage, callback) {
    const ratingScaleApi = new RatingScaleApi();
    const response = await ratingScaleApi.load(programId);
    const ratingScales = response.data;
    _saveRatingScale(0, ratingScales, programId, updateDownloadPercentage, callback);
  }

  function _saveRatingScale(index, ratingScales, programId, updateDownloadPercentage, callback) {
    if (index === ratingScales.length) {
      callback(true);
      return;
    }

    const ratingScale = ratingScales[index];
    const attrs = {
      id: ratingScale.id,
      name: ratingScale.name,
      value: ratingScale.value,
      program_id: programId,
    };
    realm.write(() => {
      realm.create('RatingScale', attrs, 'modified');
    });
    _saveLanguageRatingScale(0, ratingScale, programId, () => {
      updateDownloadPercentage(getDownloadPercentage(ratingScales.length));
      _saveRatingScale(index + 1, ratingScales, programId, updateDownloadPercentage, callback);
    });
  }

  function _saveLanguageRatingScale(index, ratingScale, programId, callbackSaveRatingScale) {
    if (index === ratingScale.language_rating_scales.length) {
      callbackSaveRatingScale();
      return;
    }

    const languageRatingScale = ratingScale.language_rating_scales[index];
    const attrs = {
      id: languageRatingScale.id,
      language_code: languageRatingScale.language_code,
      audio: languageRatingScale.audio,
      content: languageRatingScale.content,
      rating_scale_id: ratingScale.id,
      rating_scale_code: ratingScale.code,
      program_id: programId,
    };

    realm.write(() => {
      realm.create('LanguageRatingScale', attrs, 'modified');
    });
    _checkAndSave(languageRatingScale, () => {
      _saveLanguageRatingScale(index + 1, ratingScale, programId, callbackSaveRatingScale);
    })
  }

  function _checkAndSave(languageRatingScale, callBackSaveLanguageRatingScale) {
    let audioPath = languageRatingScale.audio.split('/');
    const filename = audioPath[audioPath.length - 1];

    readFile(filename, async (isSuccess, response) => {
      if (response === 'file not found') {
        _downloadAudio(languageRatingScale, filename)
      }
      else
        console.log('audio already exist')

      callBackSaveLanguageRatingScale();
    });
  }

  function _downloadAudio(languageRatingScale, filename) {
    const savingFilename = getAudioFilename(languageRatingScale.id, languageRatingScale.language_code, filename);          // Ex: 1_km_voice.mp3
    let options = {
      fromUrl: `${environment.domain}${languageRatingScale.audio}`,
      toFile: `${RNFS.DocumentDirectoryPath}/${savingFilename}`,
      background: false,
      progressDivider: 1,
    };
    RNFS.downloadFile(options).promise.then(res => {
      const attrs = {
        id: languageRatingScale.id,
        local_audio: options.toFile,
      };
      realm.write(() => {
        realm.create('LanguageRatingScale', attrs, 'modified');
      });
    }).catch(err => {
      console.log('failed to download audio = ', err);
    });
  }
})();

export default ratingScaleService;
