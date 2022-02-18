import realm from '../db/schema';

const Participant = (() => {
  return {
    find,
    getAll,
    deleteAll,
    getVoted,
    getNotRaised,
    create,
    findByScorecard,
    getNumberOfProposedParticipant,
  }

  function find(uuid) {
    return realm.objects('Participant').filtered(`uuid == '${uuid}'`)[0];
  }

  function create(data) {
    realm.write(() => {
      realm.create('Participant', data, 'modified');
    });
  }

  function getAll(scorecardUuid) {
    return realm.objects('Participant').filtered(`scorecard_uuid='${scorecardUuid}'`);
  }

  function deleteAll(scorecardUuid) {
    let participants = realm.objects('Participant').filtered(`scorecard_uuid = '${scorecardUuid}'`);

    if (participants.length > 0) {
      realm.write(() => {
        realm.delete(participants);
      });
    }
  }

  function getVoted(scorecardUuid) {
    return realm.objects('Participant').filtered(`scorecard_uuid = '${scorecardUuid}' AND voted = true`);
  }

  function getNotRaised(scorecardUuid) {
    return realm.objects('Participant').filtered(`scorecard_uuid='${scorecardUuid}' AND raised=false SORT(order ASC)`)
  }

  function findByScorecard(scorecardUuid) {
    return realm.objects('Participant').filtered(`scorecard_uuid = '${scorecardUuid}'`).sorted('order', false)
  }

  function getNumberOfProposedParticipant(scorecardUuid) {
    // return realm.objects('ProposedCriteria').filtered(`scorecard_uuid == '${scorecardUuid}' DISTINCT(participant_uuid)`).length;
    return realm.objects('ProposedIndicator').filtered(`scorecard_uuid == '${scorecardUuid}' DISTINCT(participant_uuid)`).length;
  }
})();

export default Participant;
