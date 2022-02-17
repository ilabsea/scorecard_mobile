import realm from '../db/schema';

const MODEL = 'ProposedCriteria';

const ProposedIndicator = (() => {
  return {
    find,
    create,
    update,
    getAllByScorecard,
    findByParticipant,
    findByIndicator,
    findByScorecard,
    getAllDistinctTag,
    getAllDistinct,
    destroy,
    getLastOrderNumber,
  };

  function find(scorecardUuid, participantUuid) {
    return realm.objects(MODEL).filtered('scorecard_uuid = "'+ scorecardUuid +'" AND participant_uuid = "'+ participantUuid +'" SORT(indicatorable_name ASC)');
  }

  function create(data) {
    realm.write(() => {
      realm.create(MODEL, data, 'modified');
    });
  }

  function update(uuid, params) {
    if (realm.objects(MODEL).filtered(`uuid = '${uuid}'`)) {
      realm.write(() => {
        realm.create(MODEL, Object.assign(params, {uuid: uuid}), 'modified');
      })
    }
  }

  function getAllByScorecard(scorecardUuid) {
    return realm.objects(MODEL).filtered(`scorecard_uuid='${scorecardUuid}'`);
  }

  function findByParticipant(scorecardUuid, indicatorId, participantUuid) {
    return realm.objects(MODEL).filtered(`scorecard_uuid = '${ scorecardUuid }' AND indicatorable_id = '${ indicatorId }' AND participant_uuid = '${ participantUuid }'`)[0];
  }

  function findByIndicator(scorecardUuid, indicatorableId) {
    return realm.objects(MODEL).filtered(`scorecard_uuid = '${scorecardUuid}' AND indicatorable_id = '${indicatorableId}'`);
  }

  function findByScorecard(scorecardUuid, distinctByIndicator) {
    const query = distinctByIndicator ? `scorecard_uuid='${scorecardUuid}' DISTINCT(indicatorable_id)` : `scorecard_uuid='${scorecardUuid}'`;
    return realm.objects(MODEL).filtered(query);
  }

  function getAllDistinctTag(scorecardUuid) {
    return realm.objects(MODEL).filtered(`scorecard_uuid='${scorecardUuid}' DISTINCT(tag)`);
  }

  function getAllDistinct(scorecardUuid) {
    return realm.objects(MODEL).filtered(`scorecard_uuid='${scorecardUuid}' DISTINCT(indicatorable_id, indicatorable_type)`);
  }

  function destroy(proposedCriteria) {
    realm.write(() => {
      realm.delete(proposedCriteria);
    });
  }

  function getLastOrderNumber(scorecardUuid) {
    const proposedIndicators = realm.objects(`scorecard_uuid = '${scorecardUuid}'`).max('order');
    return proposedIndicators.length > 0 ? proposedIndicators[0].order : 0;
  }
})();

export default ProposedIndicator;
