import realm from '../db/schema';

const ProposedCriteria = (() => {
  return {
    find,
  };

  function find(scorecardUuid, participantUuid) {
    return realm.objects('ProposedCriteria').filtered('scorecard_uuid = "'+ scorecardUuid +'" AND participant_uuid = "'+ participantUuid +'" SORT(indicatorable_name ASC)');
  }
})();

export default ProposedCriteria;