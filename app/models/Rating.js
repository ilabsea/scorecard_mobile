import realm from '../db/schema';

const Rating = (() => {
  return {
    create,
    deleteAll,
    findByVotingCriteriaAndParticipant,
    getAll,
  }

  function create(data) {
    realm.write(() => {
      realm.create('Rating', data);
    })
  }

  function deleteAll(scorecardUuid) {
    const ratings = realm.objects('Rating').filtered(`scorecard_uuid = '${scorecardUuid}'`);

    if (ratings.length > 0) {
      realm.write(() => {
        realm.delete(ratings);
      });
    }
  }

  function findByVotingCriteriaAndParticipant(votingCriUuid, participantUuid) {
    return realm.objects('Rating').filtered(`voting_criteria_uuid == '${votingCriUuid}' AND participant_uuid == '${participantUuid}'`)[0];
  }

  function getAll(scorecardUuid) {
    return realm.objects('Rating').filtered(`scorecard_uuid == '${scorecardUuid}'`);
  }
})();

export default Rating;
