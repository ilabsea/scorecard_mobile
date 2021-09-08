import uuidv4 from '../utils/uuidv4';
import ProposedCriteria from '../models/ProposedCriteria';

const createNewIndicatorHelper = (() => {
  return {
    isAddNewIndicatorSection,
    getUpdatedIndicators,
    isAbleToSaveIndicator,
    getNewSelectedIndicators,
    getCriteriaUuid,
    getIndicatorSelection,
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

  function getCriteriaUuid(scorecardUuid, indicatorUuid, participantUuid) {
    const proposedCriterias = ProposedCriteria.find(scorecardUuid, participantUuid);
    for (let i=0; i<proposedCriterias.length; i++) {
      if (proposedCriterias[i].indicatorable_id === indicatorUuid.toString())
        return proposedCriterias[i].uuid;
    }

    return uuidv4();
  }

  function getIndicatorSelection(index, allIndicators, selectedIndicators, unselectedIndicators) {
    let indicators = allIndicators;
    let newSelectedIndicators = selectedIndicators;
    let newUnselectedIndicators = unselectedIndicators;

    if (indicators[index].isSelected) {
      newSelectedIndicators = newSelectedIndicators.filter((indicator) => indicator.uuid !== indicators[index].uuid);
      newUnselectedIndicators.push(indicators[index]);
    }
    else if (indicators[index].uuid != '') {
      newSelectedIndicators.push(indicators[index]);
      newUnselectedIndicators = newUnselectedIndicators.filter((indicator) => indicator.uuid !== indicators[index].uuid);
    }

    indicators[index].isSelected = !indicators[index].isSelected;

    return {
      indicators: indicators,
      selectedIndicators: newSelectedIndicators,
      unselectedIndicators: newUnselectedIndicators
    }
  }
})();

export default createNewIndicatorHelper;