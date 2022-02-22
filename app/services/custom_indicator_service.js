import Scorecard from '../models/Scorecard';
import CustomIndicator from '../models/CustomIndicator';
import Indicator from '../models/Indicator';
import LanguageIndicator from '../models/LanguageIndicator';
import proposedIndicatorService from './proposed_indicator_service';
import uuidv4 from '../utils/uuidv4';
import { CUSTOM } from '../constants/indicator_constant';

const customIndicatorService = (() => {
  return {
    getIndicatorList,
    createNewIndicator,
    updateIndicator,
  }

  function getIndicatorList(scorecardUuid, searchText) {
    let customIndicators = searchText ? CustomIndicator.filter(scorecardUuid, searchText) : CustomIndicator.getAll(scorecardUuid);

    return customIndicators.length > 0
      ? JSON.parse(JSON.stringify(customIndicators)).sort((a, b) => a.name > b.name)
      : customIndicators;
  }

  function createNewIndicator(scorecardUuid, indicator, participantUuid, callback) {
    const generatedUuid = uuidv4();

    let customIndicator = {
      uuid: generatedUuid,
      indicator_uuid: generatedUuid,
      name: indicator.name,
      scorecard_uuid: scorecardUuid,
      tag: indicator.tag,
      type: CUSTOM,
    };

    const scorecard = Scorecard.find(scorecardUuid);
    const customLanguageIndicator = {
      id: uuidv4(),
      content: indicator.name,
      language_code: scorecard.audio_language_code,
      local_audio: indicator.local_audio,
      scorecard_uuid: scorecardUuid,
      indicator_id: customIndicator.uuid,
      type: CUSTOM,
    };

    Indicator.create(customIndicator);
    LanguageIndicator.create(customLanguageIndicator);

    customIndicator.indicatorable_id = generatedUuid;
    proposedIndicatorService.create(scorecardUuid, customIndicator, participantUuid);

    callback();
  }

  // function createNewIndicator(scorecardUuid, indicator, participantUuid, callback) {
  //   const customIndicator = {
  //     uuid: uuidv4(),
  //     name: indicator.name,
  //     local_audio: indicator.local_audio,
  //     scorecard_uuid: scorecardUuid,
  //     tag: indicator.tag
  //   };

  //   const scorecard = Scorecard.find(scorecardUuid);
  //   const customLanguageIndicator = {
  //     id: uuidv4(),
  //     content: indicator.name,
  //     language_code: scorecard.audio_language_code,
  //     local_audio: indicator.local_audio,
  //     scorecard_uuid: scorecardUuid,
  //     indicator_id: customIndicator.uuid,
  //     type: CUSTOM,
  //   };

  //   CustomIndicator.create(customIndicator);
  //   LanguageIndicator.create(customLanguageIndicator);
  //   proposedIndicatorService.create(scorecardUuid, customIndicator, participantUuid);

  //   callback();
  // }

  function updateIndicator(customIndicatorUuid, newIndicator, scorecardUuid, previousAudio) {
    CustomIndicator.update(customIndicatorUuid, newIndicator);
    const languageIndicator = LanguageIndicator.findByIndicatorId(customIndicatorUuid);

    const newLanguageIndicator = {
      content: newIndicator.name,
      local_audio: newIndicator.local_audio,
    }
    LanguageIndicator.update(languageIndicator.id, newLanguageIndicator);
    proposedIndicatorService.update(scorecardUuid, customIndicatorUuid, { indicatorable_name: newIndicator.name });

    // Delete the existing audio file if user record new audio for custom indicator
    if (previousAudio && (previousAudio != newIndicator.local_audio))
      CustomIndicator.deleteFile(previousAudio);
  }
})();

export default customIndicatorService;