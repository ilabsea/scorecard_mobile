import realm from '../db/schema';
import { downloadAudio } from './download_service';
import { isPhaseDownloaded } from './scorecard_download_service';
import { langRatingScaleAudioPhase } from '../constants/scorecard_constant';

class LanguageRatingScaleService {
  constructor() {
    this.isStopDownload = false;
  }

  saveAudio = (programId, successCallback, errorCallback) => {
    const langRatingScales = realm.objects('LanguageRatingScale').filtered(`program_id = ${programId}`);
    const options = {
      items: langRatingScales,
      type: 'rating',
      phase: langRatingScaleAudioPhase,
    };

    downloadAudio(0, options, successCallback, errorCallback, this._saveLocalAudioToLangRatingScale);
  }

  _saveLocalAudioToLangRatingScale = (langRatingScale, localAudioFilePath, callbackDownload) => {
    const attrs = {
      id: langRatingScale.id,
      local_audio: localAudioFilePath,
    };

    realm.write(() => {
      realm.create('LanguageRatingScale', attrs, 'modified');
    });

    if (this.isStopDownload)
      return;

    callbackDownload();
  }

  stopDownload = () => {
    this.isStopDownload = true;
  }
}

const saveLanguageRatingScale = (index, langRatingScales, ratingScale, programId, scorecardUuid, successCallback) => {
  if (index === langRatingScales.length || isPhaseDownloaded(scorecardUuid, langRatingScaleAudioPhase)) {
    successCallback(true, langRatingScaleAudioPhase);
    return;
  }

  const langRatingScale = langRatingScales[index];
  const attrs = {
    id: langRatingScale.id,
    language_code: langRatingScale.language_code,
    audio: langRatingScale.audio,
    content: langRatingScale.content,
    rating_scale_id: ratingScale.id,
    rating_scale_code: ratingScale.code,
    program_id: programId,
  };

  realm.write(() => {
    realm.create('LanguageRatingScale', attrs, 'modified');
  });

  saveLanguageRatingScale(index + 1, langRatingScales, ratingScale, programId, scorecardUuid, successCallback);
}

export { LanguageRatingScaleService, saveLanguageRatingScale };