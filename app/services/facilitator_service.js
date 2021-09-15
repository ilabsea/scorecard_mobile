import Facilitator from '../models/Facilitator';
import uuidv4 from '../utils/uuidv4';

const facilitatorService = (() => {
  return {
    loadedSavedFacilitators,
    saveSelectedFacilitators,
  }

  function loadedSavedFacilitators(scorecardUuid, selectedFacilitators, callback) {
    let savedFacilitators = Facilitator.getAll(scorecardUuid);

    if (savedFacilitators.length > 0) {
      let facilitators = selectedFacilitators;
      savedFacilitators.map((facilitator, index) => {
        facilitators[index] = {
          lable: facilitator.name,
          value: facilitator.id,
        }
      });

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