import realm from '../db/schema';
import {PREDEFINED} from '../constants/indicator_constant';
import { languageIndicatorPhase, langIndicatorAudioPhase } from '../constants/scorecard_constant';
import { downloadAudio } from './download_service';

class LanguageIndicatorService {
  constructor() {
    this.isStopDownload = false;
  }

  saveAudio = (scorecardUuid, languageCode, successCallback, errorCallback) => {
    const langIndicators = realm.objects('LanguageIndicator').filtered(`scorecard_uuid == '${scorecardUuid}' AND language_code == '${languageCode}'`);
    const options = {
      items: langIndicators,
      type: 'indicator',
      phase: langIndicatorAudioPhase,
    };

    if (langIndicators.length > 0)
      downloadAudio(0, options, successCallback, errorCallback, this._saveLocalAudioToLangIndicator);
    else
      successCallback(true, langIndicatorAudioPhase, null);
  }

  stopDownload = () => {
    this.isStopDownload = true;
  }

  _saveLocalAudioToLangIndicator = (langIndicator, localAudioFilePath, callbackDownload) => {
    const attrs = {
      id: langIndicator.id.toString(),
      local_audio: localAudioFilePath,
    };

    realm.write(() => {
      realm.create('LanguageIndicator', attrs, 'modified');
    });

    if (this.isStopDownload)
      return;

    callbackDownload();
  }
}

const saveLanguageIndicator = (scorecardUUID, indicators, successCallback) => {
  let savedCount = 0;
  indicators.map(indicator => {
    const languagesIndicators = indicator['languages_indicators'];
    if (languagesIndicators.length > 0) {
      languagesIndicators.map((languagesIndicator) => {
        const languageIndicator = {
          id: languagesIndicator.id.toString(),
          content: languagesIndicator.content,
          audio: languagesIndicator.audio != null ? languagesIndicator.audio : '',
          language_code: languagesIndicator['language_code'],
          scorecard_uuid: scorecardUUID,
          indicator_id: indicator.id.toString(),
          type: PREDEFINED,
        };

        realm.write(() => {
          realm.create('LanguageIndicator', languageIndicator, 'modified');
        });
      });
    }
    savedCount += 1;
  });
  successCallback(savedCount === indicators.length, languageIndicatorPhase);
}

const getLanguageIndicator = (scorecardUuid, indicatorId, type) => {
  const scorecard = realm.objects('Scorecard').filtered(`uuid == '${scorecardUuid}'`)[0];
  let languageCode = type === 'audio' ? scorecard.audio_language_code : scorecard.text_language_code;
  return realm.objects('LanguageIndicator').filtered(`indicator_id == '${indicatorId}' AND language_code == '${languageCode}'`)[0];
}

const find = (indicatorId, languageCode) => {
  return realm.objects('LanguageIndicator').filtered(`indicator_id='${indicatorId}' AND language_code='${languageCode}'`)[0];
}

export {
  saveLanguageIndicator,
  getLanguageIndicator,
  find,
  LanguageIndicatorService,
};