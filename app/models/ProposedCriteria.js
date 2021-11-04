import realm from '../db/schema';

const ProposedCriteria = (() => {
  return {
    find,
    create,
    update,
    findByParticipant,
    findByIndicator,
    findByScorecard,
    destroy,
  };

  function find(scorecardUuid, participantUuid) {
    return realm.objects('ProposedCriteria').filtered('scorecard_uuid = "'+ scorecardUuid +'" AND participant_uuid = "'+ participantUuid +'" SORT(indicatorable_name ASC)');
  }

  function create(data) {
    realm.write(() => {
      realm.create('ProposedCriteria', data, 'modified');
    });
  }

  function update(uuid, params) {
    if (realm.objects('ProposedCriteria').filtered(`uuid = '${uuid}'`)) {
      realm.write(() => {
        realm.create('ProposedCriteria', Object.assign(params, {uuid: uuid}), 'modified');
      })
    }
  }

  function findByParticipant(indicatorId, participantUuid) {
    return realm.objects('ProposedCriteria').filtered(`indicatorable_id = '${indicatorId}' AND participant_uuid = '${participantUuid}'`);
  }

  function findByIndicator(scorecardUuid, indicatorableId) {
    return realm.objects('ProposedCriteria').filtered(`scorecard_uuid = '${scorecardUuid}' AND indicatorable_id = '${indicatorableId}'`);
  }

  function findByScorecard(scorecardUuid, distinctIndicator) {
    const query = distinctIndicator ? `scorecard_uuid='${scorecardUuid}' DISTINCT(indicatorable_id)` : `scorecard_uuid='${scorecardUuid}'`;
    return realm.objects('ProposedCriteria').filtered(query);
  }

  function destroy(proposedCriteria) {
    realm.write(() => {
      realm.delete(proposedCriteria);
    });
  }
})();

export default ProposedCriteria;