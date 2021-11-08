import realm from '../db/schema';

const ProposedCriteria = (() => {
  return {
    find,
    create,
    update,
    findByParticipant,
    findByIndicator,
    findByScorecard,
    getAllDistinctTag,
    getAllDistinct,
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
    realm.write(() => {
      realm.create('ProposedCriteria', Object.assign(params, {uuid: uuid}), 'modified');
    })
  }

  function findByParticipant(indicatorId, participantUuid) {
    return realm.objects('ProposedCriteria').filtered(`indicatorable_id = '${indicatorId}' AND participant_uuid = '${participantUuid}'`);
  }

  function findByIndicator(scorecardUuid, indicatorableId) {
    return realm.objects('ProposedCriteria').filtered(`scorecard_uuid = '${scorecardUuid}' AND indicatorable_id = '${indicatorableId}'`);
  }

  function findByScorecard(scorecardUuid, distinctByIndicator) {
    const query = distinctByIndicator ? `scorecard_uuid='${scorecardUuid}' DISTINCT(indicatorable_id)` : `scorecard_uuid='${scorecardUuid}'`;
    return realm.objects('ProposedCriteria').filtered(query);
  }

  function getAllDistinctTag(scorecardUuid) {
    return realm.objects('ProposedCriteria').filtered(`scorecard_uuid='${scorecardUuid}' DISTINCT(tag)`);
  }

  function getAllDistinct(scorecardUuid) {
    return realm.objects('ProposedCriteria').filtered(`scorecard_uuid='${scorecardUuid}' DISTINCT(indicatorable_id, indicatorable_type)`);
  }

  function destroy(proposedCriteria) {
    realm.write(() => {
      realm.delete(proposedCriteria);
    });
  }
})();

export default ProposedCriteria;