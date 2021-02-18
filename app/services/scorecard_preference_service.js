import {
  find as findScorecardDownload,
  isDownloaded as isScorecardDownloaded,
} from './scorecard_download_service';

import {
  save as saveProgramLanguage,
  isExist as isProgramLanguageExist,
} from './program_language_service';
import { getAll as getAllProgramLanguage } from './program_language_service';
import Scorecard from '../models/Scorecard';

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

  function loadProgramLanguage(scorecard, callback) {
    const programId = scorecard.program_id;

    if (!isProgramLanguageExist(programId)) {
      saveProgramLanguage(programId,
        (languages) => {
          _initProgramLanguage(languages, scorecard, callback);
        },
        this.errorCallback
      );
    }
    else {
      const locales = getAllProgramLanguage(programId);
      _initProgramLanguage(locales, scorecard, callback);
    }
  }

  function _initProgramLanguage(locales, scorecard, callback) {
    const languagesPickerFormat = locales.map((locale) => ({value: locale.code, label: locale.name}));
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

  // function isSelectLocaleDisabled(scorecardUuid) {
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
