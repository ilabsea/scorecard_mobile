import IndicatorService from '../services/indicator_service';
import Scorecard from '../models/Scorecard';
import Indicator from '../models/Indicator';
import LanguageIndicator from '../models/LanguageIndicator';
import { PREDEFINED } from '../constants/indicator_constant';
import { indicatorPhase } from '../constants/scorecard_constant';
import uuidv4 from '../utils/uuidv4';

const indicatorHelper = (() => {
  return {
    isExist,
    getDisplayIndicator,
    getTags,
    getIndicatorId,
    hasIndicatorUuid,
    getIndicatorsAttrs,
    savePredefinedIndicator,
  };

  function isExist(indicatorId, type) {
    return Indicator.find(indicatorId, type) === undefined ? false : true;
  }

  function getDisplayIndicator(proposedIndicator, scorecardObj) {
    const scorecard = scorecardObj || Scorecard.find(proposedIndicator.scorecard_uuid);
    const indicator = Indicator.find(proposedIndicator.indicatorable_id, proposedIndicator.indicatorable_type);
    // let langIndicator = LanguageIndicator.findByIndicatorAndLanguageCode(proposedIndicator.indicatorable_id, scorecard.audio_language_code);

    const { indicatorable_id, indicatorable_type } = proposedIndicator;
    let langIndicator = LanguageIndicator.findByIndicatorAndLanguageCode(indicatorable_id, indicatorable_type, scorecard.audio_language_code);
    langIndicator = langIndicator || indicator;
    langIndicator = JSON.parse(JSON.stringify(langIndicator));
    langIndicator.content = langIndicator.content || langIndicator.name;

    if (!scorecard.isSameLanguageCode) {
      // let textIndi = LanguageIndicator.findByIndicatorAndLanguageCode(proposedIndicator.indicatorable_id, scorecard.text_language_code);
      let textIndi = LanguageIndicator.findByIndicatorAndLanguageCode(indicatorable_id, indicatorable_type, scorecard.text_language_code);
      langIndicator.content = !!textIndi ? textIndi.content : langIndicator.content;
    }

    return langIndicator;
  }

  async function getTags(scorecardUuid) {
    let indicators = await new IndicatorService().getAll(scorecardUuid);

    return indicators.map(indi => indi.tag)
            .filter(tag => !!tag)
            .filter((tag, index, self) => self.indexOf(tag) == index);
  }

  function getIndicatorId(indicator) {
    return indicator.indicator_id || indicator.id || indicator.uuid;
  }

  function hasIndicatorUuid(indicatorId) {
    const savedIndicator = Indicator.find(indicatorId, PREDEFINED);
    return !!savedIndicator.indicator_uuid
  }

  function getIndicatorsAttrs(savedIndicators) {
    let indicators = [];

    savedIndicators.map((indicator) => {
      // For custom indicator: indicator.uuid is the same as indicator.indicator_uuid
      let attrs = {
        uuid: indicator.uuid,
        indicator_uuid: indicator.indicator_uuid,
        indicatorable_id: indicator.type === PREDEFINED ? indicator.id.toString() : indicator.uuid,
        name: indicator.name,
        tag: indicator.tag,
        type: indicator.type,
      };

      indicators.push(attrs);
    });

    return indicators;
  }

  function savePredefinedIndicator(scorecardUuid, indicators, successCallback) {
    let savedCount = 0;
    indicators.map(async (indicator) => {
      // Todo: check with bong Sokly, whether indicator_uuid of the production is the same to indicator_uuid of the staging
      // if the indicator_uuid is not the same, find the indicato by indicator_uuid only (no need to find by endpoint_id)
      const savedIndicator = await Indicator.findByUuidAndCurrentEndpointId(indicator.uuid);

      if (!savedIndicator) {
        const indicatorSet = {
          uuid: uuidv4(),
          indicator_uuid: indicator.uuid,
          id: indicator.id,
          name: indicator.name,
          facility_id: indicator.categorizable.id,
          tag: indicator.tag_name,
          type: PREDEFINED,
        };
        Indicator.create(indicatorSet, scorecardUuid);
      }
      else {
        // (indicator from older version) if the existing indicator doesn't have indicator_uuid,
        // find it by indicator's id then update it with indicator_uuid, program_uuid, and endpoint_id
        const indicatorWithoutIndicatorUuid = Indicator.find(indicator.id, PREDEFINED);
        if (!!indicatorWithoutIndicatorUuid) {
          Indicator.update(indicatorWithoutIndicatorUuid.uuid, {
            indicator_uuid: indicator.uuid,
          }, scorecardUuid);
        }
      }

      savedCount += 1;
    });
    !!successCallback && successCallback(savedCount === indicators.length, indicatorPhase);
  }
})();

export default indicatorHelper;