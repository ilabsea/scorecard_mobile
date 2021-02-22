import realm from '../db/schema';

const Participant = (() => {
  return {
    getAll,
  }

  function getAll(scorecardUuid) {
    return realm.objects('Participant').filtered(`scorecard_uuid='${scorecardUuid}'`);
  }

  function deleteAll(scorecardUuid) {
    let participants = realm.objects('Participant').filtered(`scorecard_uuid = '${scorecardUuid}'`);

    realm.write(() => {
      realm.delete(participants);
    });
  }
})();

export default Participant;
