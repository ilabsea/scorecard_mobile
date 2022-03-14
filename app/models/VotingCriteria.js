import realm from '../db/schema';

// const MODEL = 'VotingCriteria';
const MODEL = 'VotingIndicator';

const VotingCriteria = (() => {
  return {
    getAll,
    find,
    findByUuid,
    filterByIndicator,
    upsert,
    getSelectedSuggestedAction,
    destroy,
  };

  function getAll(scorecardUuid) {
    return realm.objects(MODEL).filtered(`scorecard_uuid = '${scorecardUuid}' SORT(order ASC)`);
  }

  function find(scorecardUuid, indicatorId) {
    return realm.objects(MODEL).filtered(`scorecard_uuid = '${scorecardUuid}' AND indicatorable_id = '${indicatorId}'`)[0];
  }

  function findByUuid(votingCriteriaUuid) {
    return realm.objects(MODEL).filtered(`uuid = '${votingCriteriaUuid}'`)[0];
  }

  function filterByIndicator(scorecardUuid, indicatorableId, indicatorableType) {
    return realm.objects(MODEL).filtered(`scorecard_uuid='${scorecardUuid}' AND indicatorable_id='${indicatorableId}' AND indicatorable_type='${indicatorableType}'`);
  }

  function upsert(data) {
    realm.write(() => {
      realm.create(MODEL, data, 'modified');
    });
  }

  function getSelectedSuggestedAction(scorecardUuid, indicatorId) {
    const votingCriteria = find(scorecardUuid, indicatorId);
    const suggestedActions = JSON.parse(votingCriteria.suggested_action);
    let selectedSuggestedActions = [];

    votingCriteria.suggested_action_status.map((status, index) => {
      if (status)
        selectedSuggestedActions.push(suggestedActions[index]);
    });

    return selectedSuggestedActions;
  }

  function destroy(votingCriterias) {
    if (votingCriterias.length > 0) {
      realm.write(() => {
        realm.delete(votingCriterias);
      });
    }
  }
})();

export default VotingCriteria;