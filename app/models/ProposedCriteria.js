import realm from '../db/schema';

const ProposedCriteria = (() => {
  return {
    find,
    create,
    findByParticipant,
    destory,
  };

  function find(scorecardUuid, participantUuid) {
    return realm.objects('ProposedCriteria').filtered('scorecard_uuid = "'+ scorecardUuid +'" AND participant_uuid = "'+ participantUuid +'" SORT(indicatorable_name ASC)');
  }

  function create(data) {
    realm.write(() => {
      realm.create('ProposedCriteria', data, 'modified');
    });
  }

  function findByParticipant(indicatorId, participantUuid) {
    return realm.objects('ProposedCriteria').filtered(`indicatorable_id = '${indicatorId}' AND participant_uuid = '${participantUuid}'`);
  }

  function destory(proposedCriteria) {
    realm.write(() => {
      realm.delete(proposedCriteria);
    });
  }
})();

export default ProposedCriteria;