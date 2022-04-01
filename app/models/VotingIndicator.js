import realm from '../db/schema';

const MODEL = 'VotingIndicator';

const VotingIndicator = (() => {
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

  function findByUuid(votingIndicatorUuid) {
    return realm.objects(MODEL).filtered(`uuid = '${votingIndicatorUuid}'`)[0];
  }

  function filterByIndicator(scorecardUuid, indicatorableId, indicatorableType) {
    let query = `scorecard_uuid='${scorecardUuid}' AND indicatorable_id='${indicatorableId}'`;

    if (!!indicatorableType)
      query = `scorecard_uuid='${scorecardUuid}' AND indicatorable_id='${indicatorableId}' AND indicatorable_type='${indicatorableType}'`;

    return realm.objects(MODEL).filtered(query);
  }

  function upsert(data) {
    realm.write(() => {
      realm.create(MODEL, data, 'modified');
    });
  }

  function getSelectedSuggestedAction(scorecardUuid, indicatorId) {
    const votingIndicator = find(scorecardUuid, indicatorId);
    const suggestedActions = JSON.parse(votingIndicator.suggested_action);
    let selectedSuggestedActions = [];

    votingIndicator.suggested_action_status.map((status, index) => {
      if (status)
        selectedSuggestedActions.push(suggestedActions[index]);
    });

    return selectedSuggestedActions;
  }

  function destroy(votingIndicators) {
    if (votingIndicators.length > 0) {
      realm.write(() => {
        realm.delete(votingIndicators);
      });
    }
  }
})();

export default VotingIndicator;