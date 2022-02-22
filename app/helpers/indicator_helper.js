import IndicatorService from '../services/indicator_service';
import CustomIndicator from '../models/CustomIndicator';
import { find as findLanguageIndicator } from '../services/language_indicator_service';
import Scorecard from '../models/Scorecard';
import Indicator from '../models/Indicator';

const indicatorHelper = (() => {
  return {
    isExist,
    getDisplayIndicator,
    getTags,
    getIndicatorId,
  };

  function isExist(indicatorId) {
    return Indicator.find(indicatorId) === undefined ? false : true;
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

  // function getDisplayIndicator(indicatorable, scorecardObj) {
  //   const scorecard = scorecardObj || Scorecard.find(indicatorable.scorecard_uuid);

  //   if (indicatorable.indicatorable_type == 'predefined') {
  //     return _getPredefinedIndicator(indicatorable, scorecard);
  //   }

  //   let indi = JSON.parse(JSON.stringify(CustomIndicator.find(indicatorable.indicatorable_id)));
  //   indi.content = indi.content || indi.name;

  //   return indi;
  // }

  function getTags(scorecardUuid) {
    let indicators = new IndicatorService().getAll(scorecardUuid);

    return indicators.map(indi => indi.tag)
            .filter(tag => !!tag)
            .filter((tag, index, self) => self.indexOf(tag) == index);
  }

  function getIndicatorId(indicator) {
    return indicator.indicator_id || indicator.id || indicator.uuid;
  }

  // Private

  function _getPredefinedIndicator(indicatorable, scorecard) {
    let predefined = Indicator.find(indicatorable.indicatorable_id);
    let indi = findLanguageIndicator(indicatorable.indicatorable_id, scorecard.audio_language_code);
    indi = indi || predefined;
    indi = JSON.parse(JSON.stringify(indi));
    indi.content = indi.content || indi.name;
    indi.local_image = predefined.local_image;

    if (!scorecard.isSameLanguageCode) {
      let textIndi = findLanguageIndicator(indicatorable.indicatorable_id, scorecard.text_language_code);
      indi.content = !!textIndi && textIndi.content;
    }

    return indi;
  }
})();

export default indicatorHelper;
