import realm from '../db/schema';

const Facilitator = (() => {
  return {
    getAll,
    create,
    deleteAll,
    getDataForMilestone,
    deleteById,
  }

  function getAll(scorecardUuid) {
    return realm.objects('Facilitator').filtered(`scorecard_uuid='${scorecardUuid}' SORT(order ASC)`);
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

  function deleteById(id, scorecardUuid) {
    const facilitator = realm.objects('Facilitator').filtered(`id = ${id} AND scorecard_uuid = '${scorecardUuid}'`);

    if (facilitator) {
      realm.write(() => {
        realm.delete(facilitator);
      });
    }
  }
})();

export default Facilitator;
