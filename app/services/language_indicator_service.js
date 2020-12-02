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

export {saveLanguageIndicator};