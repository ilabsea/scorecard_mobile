import {
  find as findScorecardDownload,
  isDownloaded as isScorecardDownloaded,
} from './scorecard_download_service';

import { load as loadLanguage } from './program_language_service';
import Scorecard from '../models/Scorecard';
import ProgramLanguage from '../models/ProgramLanguage';

import { isKhmerLanguage } from '../utils/program_language_util';

const scorecardPreferenceService = (() => {
  return {
    getLocaleLabel,
    isFullyDownloaded,
    loadProgramLanguage,
    hasScorecardDownload,
    updatePreference,
  };

  function getLocaleLabel(languages, languageCode) {
    if (languages.length == 0)
      return '';

    let language = languages.filter((language) => language.value == languageCode )[0];
    return language.label;
  }

  function isFullyDownloaded(scorecardUuid, isFinishDownloaded) {
    return isScorecardDownloaded(scorecardUuid) || isFinishDownloaded;
  }

  function loadProgramLanguage(scorecard, appLanguage, callback, errorCallback) {
    const programId = scorecard.program_id;

    loadLanguage(programId, () => {
      const locales = ProgramLanguage.getAll(programId);
      _initProgramLanguage(locales, scorecard, appLanguage, callback);
    }, (error) => {
      errorCallback(error);
    });
  }

  function _initProgramLanguage(locales, scorecard, appLanguage, callback) {
    const languagesPickerFormat = locales.map((locale) => (
      {
        value: locale.code,
        label: appLanguage == 'en' ? locale.name_en : locale.name_km,
      }
    ));
    

    const audioLocale = _getDefaultLocaleValue(languagesPickerFormat, scorecard, 'audio');

    const languageSet = {
      languages: languagesPickerFormat,
      textLocale: _getDefaultLocaleValue(languagesPickerFormat, scorecard, 'text'),
      audioLocale: audioLocale,
    };

    callback(languageSet);
  }

  function _getDefaultLocaleValue(languages, scorecard, type) {
    let defaultValue = languages[0].value;
    languages.map((language) => {
      if (isKhmerLanguage(language))
        defaultValue = language.value;
    });

    if (scorecard.text_language_code != undefined)
      defaultValue = type === 'text' ? scorecard.text_language_code : scorecard.audio_language_code;

    return defaultValue;
  }

  function hasScorecardDownload(scorecardUuid) {
    const scorecardDownload = findScorecardDownload(scorecardUuid);
    return scorecardDownload ? true : false;
  }

  function updatePreference(scorecardUuid, date, textLocale, audioLocale) {
    const attrs = {
      conducted_date: date.toString(),
      text_language_code: textLocale,
      audio_language_code: audioLocale,
    };

    Scorecard.update(scorecardUuid, attrs);
  }
})();

export default scorecardPreferenceService;
