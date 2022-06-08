import { CUSTOM } from '../../../constants/indicator_constant';
import uuidv4 from '../../../utils/uuidv4';

const languageIndicatorMigrationService = (() => {
  return {
    addIndicatorUuid,
    createMissingCustomLanguageIndicator,
  }

  function addIndicatorUuid(oldRealm, newRealm) {
    const oldLangIndicators = oldRealm.objects('LanguageIndicator');
    const newLangIndicators = newRealm.objects('LanguageIndicator');

    // Find the indicator and add the indicator_uuid to languageIndicator
    oldLangIndicators.map((oldLangIndicator, index) => {
      if (oldLangIndicator.type == CUSTOM)
        newLangIndicators[index].indicator_uuid = oldLangIndicator.indicator_id;
      else {
        const indicator = oldRealm.objects('Indicator').filtered(`id = ${ parseInt(oldLangIndicator.indicator_id) }`)[0];
        newLangIndicators[index].indicator_uuid = indicator.indicator_uuid || '';
      }
    });
  }

  // Create the missing language indicator (from previous app version) when the text locale is different from the audio locale
  function createMissingCustomLanguageIndicator(oldRealm, newRealm) {
    const runningScorecards = oldRealm.objects('Scorecard').filtered('uploaded_date == null');

    runningScorecards.map(scorecard => {
      const customIndicators = oldRealm.objects('Indicator').filtered(`scorecard_uuid = '${scorecard.uuid}' AND type = '${CUSTOM}'`);
      customIndicators.map(indicator => {
        const langIndicator = newRealm.objects('LanguageIndicator').filtered(`scorecard_uuid = '${scorecard.uuid}' AND indicator_uuid = '${indicator.indicator_uuid}' AND language_code = '${scorecard.audio_language_code}'`)[0];
        const newLangIndicator = {
          id: uuidv4(),
          language_code: scorecard.text_language_code,
          content: indicator.name,
          local_audio: langIndicator.local_audio,
          scorecard_uuid: scorecard.uuid,
          indicator_uuid: langIndicator.indicator_uuid,
          type: CUSTOM,
        }

        newRealm.create('LanguageIndicator', newLangIndicator);
      });
    });
  }
})();

export default languageIndicatorMigrationService;