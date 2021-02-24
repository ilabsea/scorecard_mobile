import realm from '../db/schema';

const Facilitator = (() => {
  return {
    getAll,
    deleteAll,
  }

  function getAll(scorecardUuid) {
    return realm.objects('Facilitator').filtered(`scorecard_uuid='${scorecardUuid}'`);
  }

  function deleteAll(scorecardUuid) {
    const facilitators = realm.objects('Facilitator').filtered(`scorecard_uuid = '${scorecardUuid}'`);

    if (facilitators.length > 0) {
      realm.write(() => {
        realm.delete(facilitators);
      });
    }
  }
})();

export default Facilitator;
