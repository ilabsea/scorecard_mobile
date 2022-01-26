import IndicatorService from '../services/indicator_service';
import CustomIndicator from '../models/CustomIndicator';
import { find as findLanguageIndicator } from '../services/language_indicator_service';
import Scorecard from '../models/Scorecard';
import { NO_TAG } from '../constants/main_constant';

const indicatorHelper = (() => {
  return {
    getIndicatorsState,
    isExist,
    getDisplayIndicator,
    getTags,
    getIndicatorId,
    groupIndicatorByTag,
    getSortedIndicatorTag
  };

  function getIndicatorsState(props, state) {
    let indicators = props.indicators;
    let selectedIndicatorsState = state.selectedIndicators;
    let defaultSelectedIndicators = [];

    if (props.customIndicator != null) {
      selectedIndicatorsState.push(props.customIndicator);
    }

    selectedIndicatorsState.map((selectedIndicator) => {
      let index = indicators.findIndex((indicator) => {
        return indicator.uuid == selectedIndicator.uuid;
      })

      if (index != -1) {
        indicators[index].isSelected = true;

        if (!defaultSelectedIndicators.some(indicator => indicator.uuid == indicators[index].uuid))
          defaultSelectedIndicators.push(indicators[index]);
      }
    });

    return { indicators: indicators, selectedIndicators: defaultSelectedIndicators };
  }

  function isExist(indicatorId) {
    const indicator = new IndicatorService().find(indicatorId);
    return indicator === undefined ? false : true;
  }

  function getDisplayIndicator(indicatorable, scorecardObj) {
    const scorecard = scorecardObj || Scorecard.find(indicatorable.scorecard_uuid);

    if (indicatorable.indicatorable_type == 'predefined') {
      return _getPredefinedIndicator(indicatorable, scorecard);
    }

    let indi = JSON.parse(JSON.stringify(CustomIndicator.find(indicatorable.indicatorable_id)));
    indi.content = indi.content || indi.name;

    return indi;
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

  function groupIndicatorByTag(indicators) {
    const groupedIndicators = indicators.reduce((prev, curr) => {
      const tag = (curr.tag == null || curr.tag == '') ? NO_TAG : curr.tag;

      if(!prev[tag])
        prev[tag] = [];

      prev[tag].push(curr);

      return prev;
    },{});

    return groupedIndicators;
  }

  function getSortedIndicatorTag(groupedIndicators) {
    let tags = Object.keys(groupedIndicators);

    if (tags.length == 0)
      return tags;
    else if (tags.indexOf(NO_TAG) == -1)
      return tags;

    tags = tags.filter(tag => tag != NO_TAG);
    tags.push(NO_TAG);

    return tags;
  }

  // Private

  function _getPredefinedIndicator(indicatorable, scorecard) {
    let predefined = new IndicatorService().find(indicatorable.indicatorable_id);
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
