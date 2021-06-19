import realm from '../db/schema';

const Facilitator = (() => {
  return {
    getAll,
    create,
    deleteAll,
    getDataForMilestone,
  }

  function getAll(scorecardUuid) {
    return realm.objects('Facilitator').filtered(`scorecard_uuid='${scorecardUuid}'`);
  }

  function create(data) {
    realm.write(() => {
      realm.create('Facilitator', data, 'modified');
    });
  }

  function deleteAll(scorecardUuid) {
    const facilitators = realm.objects('Facilitator').filtered(`scorecard_uuid = '${scorecardUuid}'`);

    if (facilitators.length > 0) {
      realm.write(() => {
        realm.delete(facilitators);
      });
    }
  }

  function getDataForMilestone(scorecardUuid) {
    const facilitators = getAll(scorecardUuid);
    let facilitatorAttrs = []

    facilitators.map((facilitator) => {
      const attrs = {
        id: '',
        caf_id: facilitator.id,
        position: facilitator.position,
        scorecard_uuid: scorecardUuid,
      };

      facilitatorAttrs.push(attrs);
    });

    return facilitatorAttrs;
  }
})();

export default Facilitator;
