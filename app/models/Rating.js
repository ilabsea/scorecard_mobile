import realm from '../db/schema';

const Rating = (() => {
  return {
    create,
    deleteAll,
    findByVotingCriteriaAndParticipant,
  }

  function create(data) {
    realm.write(() => {
      realm.create('Rating', data);
    })
  }

  function deleteAll(scorecardUuid) {
    const ratings = realm.objects('Rating').filtered(`scorecard_uuid = '${scorecardUuid}'`);

    realm.write(() => {
      realm.delete(ratings);
    });
  }

  function findByVotingCriteriaAndParticipant(votingCriUuid, participantUuid) {
    return realm.objects('Rating').filtered(`voting_criteria_uuid == '${votingCriUuid}' AND participant_uuid == '${participantUuid}'`)[0];
  }
})();

export default Rating;
