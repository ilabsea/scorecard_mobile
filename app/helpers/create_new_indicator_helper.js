import uuidv4 from '../utils/uuidv4';
import ProposedCriteria from '../models/ProposedCriteria';
import { CUSTOM } from '../utils/variable';

const createNewIndicatorHelper = (() => {
  return {
    getUpdatedIndicators,
    isAbleToSaveIndicator,
    getNewSelectedIndicators,
    getCriteriaUuid,
    toggleIndicator,
    getUpdatedSelectedIndicators,
    createNewProposedIndicator,
    deleteUnselectedProposedIndicator,
  };

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

  function toggleIndicator(indicatorUuid, indicators, selectedIndicators, unselectedIndicators) {
    let newIndicators = indicators;
    let newSelectedIndicators = selectedIndicators;
    let newUnselectedIndicators = unselectedIndicators;
    const index = indicators.findIndex(item => item.uuid == indicatorUuid);

    if (newIndicators[index].isSelected) {
      newSelectedIndicators = newSelectedIndicators.filter((indicator) => indicator.indicatorable_id.toString() !== newIndicators[index].uuid.toString());
      newUnselectedIndicators.push(newIndicators[index]);
    }
    else if (newIndicators[index].uuid != '') {
      const indicator = newIndicators[index];
      indicator['indicatorable_id'] = indicator.uuid;
      newSelectedIndicators.push(indicator);
      newUnselectedIndicators = newUnselectedIndicators.filter((indicator) => indicator.uuid !== newIndicators[index].uuid);
    }

    newIndicators[index].isSelected = !newIndicators[index].isSelected;

    return { newIndicators, newSelectedIndicators, newUnselectedIndicators }
  }

  function getUpdatedSelectedIndicators(selectedIndicators, updatedIndicator) {
    if (selectedIndicators.length == 0)
      return [];

    const index = selectedIndicators.findIndex(item => item.uuid == updatedIndicator.uuid);
    if (index == -1)
      return selectedIndicators;

    let updatedSelectedIndicators = selectedIndicators;
    updatedSelectedIndicators[index].name = updatedIndicator.name;
    updatedSelectedIndicators[index].tag = updatedIndicator.tag;

    return updatedSelectedIndicators;
  }

  function createNewProposedIndicator(scorecardUuid, participantUuid, selectedIndicators) {
    selectedIndicators.map((indicator) => {
      const indicatorId = indicator.indicatorable_id || indicator.uuid;

      if (ProposedCriteria.findByParticipant(indicatorId, participantUuid).length == 0) {
        const attrs = {
          uuid: getCriteriaUuid(scorecardUuid, indicator.uuid, participantUuid),
          scorecard_uuid: scorecardUuid.toString(),
          indicatorable_id: indicator.uuid.toString(),
          indicatorable_type: indicator.type || CUSTOM,
          indicatorable_name: indicator.name,
          participant_uuid: participantUuid,
          tag: indicator.tag
        };

        ProposedCriteria.create(attrs);
      }
    });
  }

  function deleteUnselectedProposedIndicator(scorecardUuid, participantUuid, unselectedIndicators) {
    const proposedCriterias = ProposedCriteria.find(scorecardUuid, participantUuid);
    let deleteCriterias = [];
    proposedCriterias.map((criteria) => {
      unselectedIndicators.map((indicator) => {
        if (indicator.uuid == criteria.indicatorable_id)
          deleteCriterias.push(criteria);
      })
    });
    deleteCriterias.map((criteria) => {
      const proposedCriteria = ProposedCriteria.findByParticipant(criteria.indicatorable_id, participantUuid);
      ProposedCriteria.destroy(proposedCriteria);
    });
  }
})();

export default createNewIndicatorHelper;