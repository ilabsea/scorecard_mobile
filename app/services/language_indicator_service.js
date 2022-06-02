import {PREDEFINED} from '../constants/indicator_constant';
import { languageIndicatorPhase, langIndicatorAudioPhase } from '../constants/scorecard_constant';
import { downloadAudio } from './download_service';
import LanguageIndicator from '../models/LanguageIndicator';
import Scorecard from '../models/Scorecard';

class LanguageIndicatorService {
  constructor() {
    this.isStopDownload = false;
  }

  saveAudio = (scorecardUuid, languageCode, successCallback, errorCallback) => {
    const langIndicators = LanguageIndicator.findByScorecardAndLanguageCode(scorecardUuid, languageCode);
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

    LanguageIndicator.create(attrs);

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
        const langIndicatorData = {
          content: languagesIndicator.content,
          audio: languagesIndicator.audio != null ? languagesIndicator.audio : '',
          language_code: languagesIndicator['language_code'],
          scorecard_uuid: scorecardUUID,
          indicator_uuid: indicator.uuid,
          type: PREDEFINED,
        };

        LanguageIndicator.update(languagesIndicator.id.toString(), langIndicatorData);
      });
    }
    savedCount += 1;
  });
  !!successCallback && successCallback(savedCount === indicators.length, languageIndicatorPhase);
}

const getLanguageIndicator = (scorecardUuid, indicatorUuid, type) => {
  const scorecard = Scorecard.find(scorecardUuid);
  const languageCode = type === 'audio' ? scorecard.audio_language_code : scorecard.text_language_code;
  return LanguageIndicator.findByIndicatorUuidAndLanguageCode(indicatorUuid, languageCode);
}

export {
  saveLanguageIndicator,
  getLanguageIndicator,
  LanguageIndicatorService,
};