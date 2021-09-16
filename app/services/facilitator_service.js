import Facilitator from '../models/Facilitator';
import Caf from '../models/Caf';
import uuidv4 from '../utils/uuidv4';

const facilitatorService = (() => {
  return {
    loadSavedFacilitators,
    saveSelectedFacilitators,
  }

  function loadSavedFacilitators(scorecardUuid, callback) {
    let savedFacilitators = Facilitator.getAll(scorecardUuid);

    if (savedFacilitators.length > 0) {
      let facilitators = [];
      let deleteFacilitators = [];

      savedFacilitators.map(facilitator => {
        if (!Caf.findById(facilitator.id))
          deleteFacilitators.push(facilitator);
        else {
          facilitators.push({
            label: facilitator.name,
            value: facilitator.id,
          })
        }
      });

      deleteFacilitators.map(facilitator => {
        Facilitator.deleteById(facilitator.id);
      })

      callback(facilitators);
    }
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
})();

export default facilitatorService;