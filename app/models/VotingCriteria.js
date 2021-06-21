import realm from '../db/schema';

const VotingCriteria = (() => {
  return {
    getAll,
    find,
    upsert,
    getSelectedSuggestedAction,
  };

  function getAll(scorecardUuid) {
    return realm.objects('VotingCriteria').filtered(`scorecard_uuid = '${scorecardUuid}'`);
  }

  function find(scorecardUuid, indicatorId) {
    return realm.objects('VotingCriteria').filtered(`scorecard_uuid = '${scorecardUuid}' AND indicatorable_id = '${indicatorId}'`)[0];
  }

  function upsert(data) {
    realm.write(() => {
      realm.create('VotingCriteria', data, 'modified');
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
})();

export default VotingCriteria;