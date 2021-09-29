import Facilitator from '../models/Facilitator';
import Caf from '../models/Caf';
import uuidv4 from '../utils/uuidv4';

const facilitatorService = (() => {
  return {
    loadSavedFacilitators,
    saveSelectedFacilitators,
  }

  function loadSavedFacilitators(scorecardUuid, currentSelectedFacilitators, callback) {
    let savedFacilitators = Facilitator.getAll(scorecardUuid);

    const selectedFacilitators = savedFacilitators.length > 0 ? savedFacilitators : currentSelectedFacilitators;
    callback(_getSelectedFacilitator(selectedFacilitators));
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
    };

    Facilitator.create(attrs);
  }

  function _getSelectedFacilitator(selectedFacilitators) {
    let facilitators = [];
    let deleteFacilitators = [];

    for (let i = 0; i < selectedFacilitators.length; i++) {
      const facilitator = selectedFacilitators[i];
      if (!facilitator)
        continue;

      const facilitatorId = facilitator.id || facilitator.value;
      if (!Caf.findById(facilitatorId))
        deleteFacilitators.push(facilitator);
      else {
        facilitators.push({
          label: facilitator.name || facilitator.label,
          value: facilitatorId,
        });
      }
    }

    deleteFacilitators.map(facilitator => {
      const facilitatorId = facilitator.id || facilitator.value;

      if (Facilitator.findById(facilitatorId))
        Facilitator.deleteById(facilitatorId);
    });

    return facilitators;
  }
})();

export default facilitatorService;