import realm from '../db/schema';
import {PREDEFINED} from '../utils/variable';

const saveLanguageIndicator = (scorecardUUID, indicators) => {
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
  });
}

const getLanguageIndicator = (scorecardUuid, indicatorId, type) => {
  const scorecardPreference = realm.objects('ScorecardPreference').filtered(`scorecard_uuid == '${scorecardUuid}'`)[0];
  let languageCode = type === 'audio' ? scorecardPreference.audio_language_code : scorecardPreference.text_language_code;
  return realm.objects('LanguageIndicator').filtered(`indicator_id == '${indicatorId}' AND language_code == '${languageCode}'`)[0];
}

export {saveLanguageIndicator, getLanguageIndicator};