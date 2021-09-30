import realm from '../db/schema';

const Rating = (() => {
  return {
    create,
    deleteAll,
    findByVotingCriteriaAndParticipant,
    getAll,
    destroy,
    findByVotingCriteria,
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

  function destroy(scorecardUuid, votingCriteriaUuid) {
    const rating = realm.objects('Rating').filtered(`scorecard_uuid = '${scorecardUuid}' AND voting_criteria_uuid = '${votingCriteriaUuid}'`)[0];

    if (rating) {
      realm.write(() => {
        realm.delete(rating);
      });
    }
  }

  function findByVotingCriteria(votingCriteriaUuid) {
    return realm.objects('Rating').filtered(`voting_criteria_uuid == '${votingCriteriaUuid}'`)[0];
  }
})();

export default Rating;
