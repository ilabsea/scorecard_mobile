import Scorecard from '../models/Scorecard';
import Indicator from '../models/Indicator';
import LanguageIndicator from '../models/LanguageIndicator';
import proposedIndicatorService from './proposed_indicator_service';
import { deleteFile } from './local_file_system_service';
import uuidv4 from '../utils/uuidv4';
import { CUSTOM } from '../constants/indicator_constant';

const customIndicatorService = (() => {
  return {
    createNewIndicator,
    updateIndicator,
    deleteIndicatorsByScorecard,
  }

  function createNewIndicator(scorecardUuid, indicator, participantUuid, callback) {
    const generatedUuid = uuidv4();
    const scorecard = Scorecard.find(scorecardUuid);

    let customIndicator = {
      uuid: generatedUuid,
      indicator_uuid: generatedUuid,
      name: indicator.name,
      scorecard_uuid: scorecardUuid,
      tag: indicator.tag,
      type: CUSTOM,
      facility_id: scorecard.facility_id,
    };

    Indicator.create(customIndicator, scorecardUuid);
    LanguageIndicator.create(_getLanguageCustomIndicatorParams(indicator, scorecard, 'audio', customIndicator));

    // Create another language indicator if the locale of the audio and text are different
    if (!scorecard.isSameLanguageCode)
      LanguageIndicator.create(_getLanguageCustomIndicatorParams(indicator, scorecard, 'text', customIndicator));

    customIndicator['indicatorable_id'] = customIndicator.uuid;

    if (!!participantUuid)
      proposedIndicatorService.create(scorecardUuid, customIndicator, participantUuid);

    callback(customIndicator);
  }

  function updateIndicator(customIndicatorUuid, newIndicator, scorecardUuid, previousAudio) {
    const indicatorParams = {
      name: newIndicator.name,
      tag: newIndicator.tag,
    }

    Indicator.update(customIndicatorUuid, indicatorParams, scorecardUuid);
    const languageIndicator = LanguageIndicator.findByIndicatorUuid(customIndicatorUuid);

    const newLanguageIndicator = {
      content: newIndicator.name,
      local_audio: newIndicator.local_audio,
    }
    LanguageIndicator.update(languageIndicator.id, newLanguageIndicator);
    proposedIndicatorService.update(scorecardUuid, customIndicatorUuid, { indicatorable_name: newIndicator.name });

    // Delete the existing audio file if user record new audio for custom indicator
    if (previousAudio && (previousAudio != newIndicator.local_audio))
      deleteFile(previousAudio);
  }

  function deleteIndicatorsByScorecard(scorecardUuid) {
    const customIndicators = Indicator.getCustomIndicators(scorecardUuid);

    customIndicators.map((customIndicator, index) => {
      LanguageIndicator.destroy(customIndicator.indicator_uuid);

      if (index === customIndicators.length -1)
        Indicator.destroy(customIndicators);
    });
  }

  // private method
  function _getLanguageCustomIndicatorParams(indicator, scorecard, languageType, customIndicator) {
    return {
      id: uuidv4(),
      content: indicator.name,
      language_code: languageType == 'text' ? scorecard.text_language_code : scorecard.audio_language_code,
      local_audio: indicator.local_audio,
      scorecard_uuid: scorecard.uuid,
      indicator_uuid: customIndicator.uuid,
      type: CUSTOM,
    };
  }
})();

export default customIndicatorService;
