import uuidv4 from '../utils/uuidv4';
import ProposedIndicator from '../models/ProposedIndicator';
import proposedIndicatorService from '../services/proposed_indicator_service';
import { CUSTOM } from '../utils/variable';

const createNewIndicatorHelper = (() => {
  return {
    getUpdatedIndicators,
    isAbleToSaveIndicator,
    getNewSelectedIndicators,
    getCriteriaUuid,
    getIndicatorSelection,
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
    const proposedIndicators = ProposedIndicator.find(scorecardUuid, participantUuid);
    for (let i=0; i<proposedIndicators.length; i++) {
      if (proposedIndicators[i].indicatorable_id === indicatorUuid.toString())
        return proposedIndicators[i].uuid;
    }

    return uuidv4();
  }

  function getIndicatorSelection(index, allIndicators, selectedIndicators, unselectedIndicators) {
    let indicators = allIndicators;
    let newSelectedIndicators = selectedIndicators;
    let newUnselectedIndicators = unselectedIndicators;

    if (indicators[index].isSelected) {
      newSelectedIndicators = newSelectedIndicators.filter((indicator) => indicator.indicatorable_id !== indicators[index].indicatorable_id);
      newUnselectedIndicators.push(indicators[index]);
    }
    else if (indicators[index].uuid != '') {
      const newIindicator = indicators[index];
      newIindicator['indicatorable_id'] = newIindicator.uuid.toString();
      newSelectedIndicators.push(newIindicator);
      newUnselectedIndicators = newUnselectedIndicators.filter((indicator) => indicator.uuid !== indicators[index].uuid);
    }

    indicators[index].isSelected = !indicators[index].isSelected;

    return {
      indicators: indicators,
      selectedIndicators: newSelectedIndicators,
      unselectedIndicators: newUnselectedIndicators
    }
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

      if (ProposedIndicator.findByParticipant(scorecardUuid, indicatorId, participantUuid).length == 0) {
        const attrs = {
          uuid: getCriteriaUuid(scorecardUuid, indicator.uuid, participantUuid),
          scorecard_uuid: scorecardUuid.toString(),
          indicatorable_id: indicator.uuid.toString(),
          indicatorable_type: indicator.type || CUSTOM,
          indicatorable_name: indicator.name,
          participant_uuid: participantUuid,
          tag: indicator.tag
        };

        ProposedIndicator.create(attrs);
      }
    });
  }

  function deleteUnselectedProposedIndicator(scorecardUuid, participantUuid, unselectedIndicators) {
    const proposedIndicators = ProposedIndicator.find(scorecardUuid, participantUuid);
    let deleteIndciators = [];
    proposedIndicators.map((indicator) => {
      unselectedIndicators.map((unselectedIndicator) => {
        if (unselectedIndicator.uuid == indicator.indicatorable_id)
          deleteIndciators.push(indicator);
      })
    });
    deleteIndciators.map((indicator) => {
      const proposedIndicator = ProposedIndicator.findByParticipant(scorecardUuid, indicator.indicatorable_id, participantUuid);
      ProposedIndicator.destroy(proposedIndicator);
    });
  }
})();

export default createNewIndicatorHelper;
