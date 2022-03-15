import realm from '../db/schema';

const Rating = (() => {
  return {
    create,
    deleteAll,
    findByVotingIndicatorAndParticipant,
    getAll,
    has,
    destroy,
    findByVotingIndicator,
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

  function findByVotingIndicatorAndParticipant(votingCriUuid, participantUuid) {
    return realm.objects('Rating').filtered(`voting_indicator_uuid == '${votingCriUuid}' AND participant_uuid == '${participantUuid}'`)[0];
  }

  function getAll(scorecardUuid) {
    return realm.objects('Rating').filtered(`scorecard_uuid == '${scorecardUuid}'`);
  }

  function has(scorecardUuid) {
    return getAll(scorecardUuid).length > 0;
  }

  function destroy(scorecardUuid, votingCriteriaUuid) {
    const rating = realm.objects('Rating').filtered(`scorecard_uuid = '${scorecardUuid}' AND voting_indicator_uuid = '${votingCriteriaUuid}'`)[0];

    if (rating) {
      realm.write(() => {
        realm.delete(rating);
      });
    }
  }

  function findByVotingIndicator(votingCriteriaUuid) {
    return realm.objects('Rating').filtered(`voting_indicator_uuid == '${votingCriteriaUuid}'`)[0];
  }
})();

export default Rating;
