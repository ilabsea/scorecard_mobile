import IndicatorService from '../services/indicator_service';
import customIndicatorService from '../services/custom_indicator_service';
import { find as findLanguageIndicator } from '../services/language_indicator_service';
import Scorecard from '../models/Scorecard';

const indicatorHelper = (() => {
  return {
    getIndicatorsState,
    isExist,
    getDisplayIndicator,
    getTags,
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

    let indi = JSON.parse(JSON.stringify(customIndicatorService.find(indicatorable.indicatorable_id)));
    indi.content = indi.content || indi.name;

    return indi;
  }

  function getTags(scorecardUuid) {
    let indicators = new IndicatorService().getAll(scorecardUuid);

    return indicators.map(indi => indi.tag)
            .filter(tag => !!tag)
            .filter((tag, index, self) => self.indexOf(tag) == index);
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
