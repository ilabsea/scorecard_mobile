import realm from '../db/schema';

const facilitatorService = (() => {
  return {
    getAll
  };

  function getAll(scorecardUuid) {
    return realm.objects('Facilitator').filtered(`scorecard_uuid='${scorecardUuid}'`);
  }
})();

export default facilitatorService;
