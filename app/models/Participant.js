import realm from '../db/schema';

const Participant = (() => {
  return {
    getAll,
    deleteAll,
    getVoted,
    getNotRaised,
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
})();

export default Participant;
