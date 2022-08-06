import realm from '../db/schema';

const MODEL = 'Participant';

const Participant = (() => {
  return {
    find,
    getAllByScorecard,
    deleteAll,
    getVoted,
    getUnvoted,
    getNotRaised,
    create,
    update,
    findByScorecardAndParticipantUuid,
    getRaisedCountableParticipant,
    getRaisedParticipants,
    getAllCountable,
    getAnonymousByScorecard,
    isAnonymous,
  }

  function find(uuid) {
    return realm.objects(MODEL).filtered(`uuid == '${uuid}'`)[0];
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
    return realm.objects(MODEL).filtered(`scorecard_uuid = '${scorecardUuid}'`).sorted('order', false)
  }

  function deleteAll(scorecardUuid) {
    let participants = realm.objects(MODEL).filtered(`scorecard_uuid = '${scorecardUuid}'`);

    if (participants.length > 0) {
      realm.write(() => {
        realm.delete(participants);
      });
    }
  }

  function getVoted(scorecardUuid) {
    return realm.objects(MODEL).filtered(`scorecard_uuid = '${scorecardUuid}' AND voted = true`);
  }

  function getUnvoted(scorecardUuid) {
    return realm.objects(MODEL).filtered(`scorecard_uuid = '${scorecardUuid}' AND voted = false AND countable = true SORT(order ASC)`);
  }

  function getNotRaised(scorecardUuid) {
    return realm.objects(MODEL).filtered(`scorecard_uuid='${scorecardUuid}' AND raised=false SORT(order ASC)`)
  }

  function findByScorecardAndParticipantUuid(scorecardUuid, participantUuid) {
    return realm.objects('Participant').filtered('scorecard_uuid = "'+ scorecardUuid +'" AND uuid ="'+ participantUuid +'"')[0];
  }

  function getRaisedCountableParticipant(scorecardUuid) {
    return realm.objects(MODEL).filtered(`scorecard_uuid = '${scorecardUuid}' AND raised = true AND countable = true`).length;
  }

  function getRaisedParticipants(scorecardUuid) {
    return realm.objects(MODEL).filtered(`scorecard_uuid == '${scorecardUuid}' AND raised=true`).sorted('order', false);
  }

  function getAllCountable(scorecardUuid) {
    return realm.objects(MODEL).filtered(`scorecard_uuid == '${scorecardUuid}' AND countable == true`).sorted('order', false);
  }

  function getAnonymousByScorecard(scorecardUuid) {
    return realm.objects(MODEL).filtered(`scorecard_uuid == '${scorecardUuid}' AND countable == false`);
  }

  function isAnonymous(uuid) {
    return !find(uuid).countable;
  }
})();

export default Participant;
