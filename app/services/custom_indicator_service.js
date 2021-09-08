import CustomIndicator from '../models/CustomIndicator';

const customIndicatorService = (() => {
  return {
    getIndicatorList,
  }

  function getIndicatorList(scorecardUuid, searchText) {
    const customIndicators = searchText != '' ? CustomIndicator.filter(scorecardUuid, searchText) : CustomIndicator.getAll(scorecardUuid);
    return customIndicators.sort((a, b) => a.name > b.name);

    // return this._getIndicatorAttrs(customIndicators);
  }

  // private method
  // function _getFormattedAttrs(customIndicators) {
  //   let indicators = [];

  //   customIndicators.map((indicator) => {
  //     let attrs = {
  //       uuid: indicator.id || indicator.uuid,
  //       name: indicator.name,
  //       shortcut: getIndicatorShortcutName(indicator.name),
  //       isSelected: false,
  //       tag: indicator.tag,
  //       type: !!indicator.id ? PREDEFINED : CUSTOM,
  //       local_image: indicator.local_image,
  //     };

  //     indicators.push(attrs);
  //   });

  //   return indicators;
  // }
})();

export default customIndicatorService;