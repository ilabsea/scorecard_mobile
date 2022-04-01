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

    let langIndicator = LanguageIndicator.findByIndicatorAndLanguageCode(proposedIndicator.indicatorable_id, scorecard.audio_language_code);
    langIndicator = langIndicator || indicator;
    langIndicator = JSON.parse(JSON.stringify(langIndicator));
    langIndicator.content = langIndicator.content || langIndicator.name;

    if (!scorecard.isSameLanguageCode) {
      let textIndi = LanguageIndicator.findByIndicatorAndLanguageCode(proposedIndicator.indicatorable_id, scorecard.text_language_code);
      langIndicator.content = !!textIndi && textIndi.content;
    }

    return langIndicator;
  }

  function getTags(scorecardUuid) {
    let indicators = new IndicatorService().getAll(scorecardUuid);

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

  function savePredefinedIndicator(indicators, successCallback) {
    let savedCount = 0;
    indicators.map((indicator) => {
      const savedIndicator = Indicator.find(indicator.id, PREDEFINED);

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
        Indicator.create(indicatorSet);
      }
      else if(!!savedIndicator && !savedIndicator.indicator_uuid)
        Indicator.update(savedIndicator.uuid, { indicator_uuid: indicator.uuid });

      savedCount += 1;
    });
    !!successCallback && successCallback(savedCount === indicators.length, indicatorPhase);
  }
})();

export default indicatorHelper;