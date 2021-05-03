const createNewIndicatorHelper = (() => {
  return {
    isAddNewIndicatorSection,
    getUpdatedIndicators,
    isAbleToSaveIndicator,
    getNewSelectedIndicators,
  };

  function isAddNewIndicatorSection(index, indicators) {
    if (index == indicators.length -1 && indicators[index].uuid == '')
      return true;

    return false;
  }

  function getUpdatedIndicators(indicators, unSelectedIndicators) {
    let newIndicators = indicators;

    unSelectedIndicators.map((unSelectedIndicator) => {
      const index = indicators.findIndex((indicator) => indicator.uuid == unSelectedIndicator.uuid);

      if (newIndicators[index])
        newIndicators[index].isSelected = false;
    });

    return newIndicators;
  }

  function isAbleToSaveIndicator(selectedIndicators) {
    return selectedIndicators != undefined && selectedIndicators.length > 0;
  }

  function getNewSelectedIndicators(allSelectedIndicators, unsavedSelectedIndicators, unselectedIndicators) {
    if (unsavedSelectedIndicators.length > 0)
      return unsavedSelectedIndicators;

    return allSelectedIndicators.filter((indicator) => unselectedIndicators.every((unselectedIndicator) => unselectedIndicator.uuid != indicator.uuid));
  }
})();

export default createNewIndicatorHelper;