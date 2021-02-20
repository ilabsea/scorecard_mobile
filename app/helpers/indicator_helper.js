import realm from '../db/schema';

import IndicatorService from '../services/indicator_service';

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
    const indicator = realm.objects('Indicator').filtered(`id == ${indicatorId}`)[0];
    return indicator === undefined ? false : true;
  }

  function getDisplayIndicator(indicatorable, scorecardObj) {
    const scorecard = scorecardObj || realm.objects('Scorecard').filtered(`uuid='${indicatorable.scorecard_uuid}'`)[0];

    if (indicatorable.indicatorable_type == 'predefined') {
      return _getPredefinedIndicator(indicatorable, scorecard);
    }

    let indi = JSON.parse(JSON.stringify(realm.objects('CustomIndicator').filtered(`uuid='${indicatorable.indicatorable_id}'`)[0]));
    indi.content = indi.content || indi.name;

    return indi;
  }

  function getTags(scorecardUuid) {
    const indicatorService = new IndicatorService();
    let indicators = indicatorService.getAll(scorecardUuid);

    return indicators.map(indi => indi.tag)
            .filter(tag => !!tag)
            .filter((tag, index, self) => self.indexOf(tag) == index);
  }

  // Private
  function _getLangIndicator(indicatorId, languageCode) {
    return realm.objects('LanguageIndicator').filtered(`indicator_id='${indicatorId}' AND language_code='${languageCode}'`)[0];
  }

  function _getPredefinedIndicator(indicatorable, scorecard) {
    let predefined = realm.objects('Indicator').filtered(`id='${indicatorable.indicatorable_id}'`)[0];
    let indi = _getLangIndicator(indicatorable.indicatorable_id, scorecard.audio_language_code);
    indi = indi || predefined;
    indi = JSON.parse(JSON.stringify(indi));
    indi.content = indi.content || indi.name;
    indi.local_image = predefined.local_image;

    if (!scorecard.isSameLanguageCode) {
      let textIndi = _getLangIndicator(indicatorable.indicatorable_id, scorecard.text_language_code);
      indi.content = !!textIndi && textIndi.content;
    }

    return indi;
  }
})();

export default indicatorHelper;