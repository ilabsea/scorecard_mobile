import Facilitator from '../models/Facilitator';
import Caf from '../models/Caf';
import uuidv4 from '../utils/uuidv4';
import { environment } from '../config/environment';

const facilitatorService = (() => {
  return {
    loadSavedFacilitators,
    saveSelectedFacilitators,
  }

  function loadSavedFacilitators(scorecardUuid, currentSelectedFacilitators, callback) {
    let savedFacilitators = Facilitator.getAll(scorecardUuid);
    const numberOfSavedFacilitator = savedFacilitators.filter(facilitator => facilitator != null).length;
    const numberOfCurrentSeletedFacilitator = currentSelectedFacilitators.filter(facilitator => facilitator != null).length;
    const selectedFacilitators = numberOfSavedFacilitator > numberOfCurrentSeletedFacilitator ? savedFacilitators : currentSelectedFacilitators;

    callback(_getSelectedFacilitator(selectedFacilitators, scorecardUuid));
  }

  function saveSelectedFacilitators(selectedFacilitators, scorecardUuid) {
    for(let i = 0; i < selectedFacilitators.length; i++) {
      if (selectedFacilitators[i] === null)
        continue;

      _saveFacilitatorToLocalStorage(scorecardUuid, selectedFacilitators[i], i);
    }
  }

  // private method
  function _saveFacilitatorToLocalStorage(scorecardUuid, caf, index) {
    const facilitators = Facilitator.getAll(scorecardUuid);
    const attrs = {
      uuid: facilitators[index] === undefined ? uuidv4() : facilitators[index].uuid,
      id: parseInt(caf.value),
      name: caf.label,
      position: index === 0 ? 'lead' : 'other',
      scorecard_uuid: scorecardUuid,
      order: index + 1
    };

    console.log('create facilitator == ', attrs)

    Facilitator.create(attrs);
  }

  function _getSelectedFacilitator(selectedFacilitators, scorecardUuid) {
    let facilitators = Array.from({length: environment.numberOfFacilitators}, () => null);
    let deleteFacilitators = [];

    for (let i = 0; i < selectedFacilitators.length; i++) {
      const facilitator = selectedFacilitators[i];
      if (!facilitator)
        continue;

      const facilitatorId = facilitator.id || facilitator.value;
      if (!Caf.findById(facilitatorId)) {
        deleteFacilitators.push(facilitator);
        facilitators[i] = null;
      }
      else {
        facilitators[i] = {
          label: facilitator.name || facilitator.label,
          value: facilitatorId,
        }
      }
    }

    deleteFacilitators.map(facilitator => {
      const facilitatorId = facilitator.id || facilitator.value;

      Facilitator.deleteById(facilitatorId, scorecardUuid);
    });

    return facilitators;
  }
})();

export default facilitatorService;