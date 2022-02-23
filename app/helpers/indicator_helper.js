import IndicatorService from '../services/indicator_service';
import { find as findLanguageIndicator } from '../services/language_indicator_service';
import Scorecard from '../models/Scorecard';
import Indicator from '../models/Indicator';
import { PREDEFINED } from '../constants/indicator_constant';

const indicatorHelper = (() => {
  return {
    isExist,
    getDisplayIndicator,
    getTags,
    getIndicatorId,
    hasIndicatorUuid,
    getIndicatorsAttrs,
  };

  function isExist(indicatorId, type) {
    return Indicator.find(indicatorId, type) === undefined ? false : true;
  }

  function getDisplayIndicator(proposedIndicator, scorecardObj) {
    const scorecard = scorecardObj || Scorecard.find(proposedIndicator.scorecard_uuid);
    const indicator = Indicator.find(proposedIndicator.indicatorable_id, proposedIndicator.indicatorable_type);

    let langIndicator = findLanguageIndicator(proposedIndicator.indicatorable_id, scorecard.audio_language_code);
    langIndicator = langIndicator || indicator;
    langIndicator = JSON.parse(JSON.stringify(langIndicator));
    langIndicator.content = langIndicator.content || langIndicator.name;

    if (!scorecard.isSameLanguageCode) {
      let textIndi = findLanguageIndicator(proposedIndicator.indicatorable_id, scorecard.text_language_code);
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
})();

export default indicatorHelper;