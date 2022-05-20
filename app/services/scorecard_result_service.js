import VotingIndicator from '../models/VotingIndicator';
import scorecardResultHelper from '../helpers/scorecard_result_helper';

const scorecardResultService = (() => {
  return {
    isSaveAble,
    updateVotingIndicator,
  };

  function isSaveAble(scorecard) {
    if (scorecard.finished)
      return false;

    const votingIndicators = VotingIndicator.getAll(scorecard.uuid);
    for (let i=0; i < votingIndicators.length; i++) {
      if (!votingIndicators[i].suggested_action)
        return false;
    }

    return true;
  }

  function updateVotingIndicator(allPoints, indicator, selectedActions, callback) {
    let data = { uuid: indicator.uuid };
    let inputtedPoints = allPoints;
    inputtedPoints = inputtedPoints.filter(note => note.length > 0);

    data[indicator.currentFieldName] = inputtedPoints.length == 0 ? null : JSON.stringify(inputtedPoints);

    if (scorecardResultHelper.isSuggestedAction(indicator.currentFieldName))
      data['suggested_action_status'] = scorecardResultHelper.getValidSuggestedStatuses(allPoints, selectedActions);

    VotingIndicator.upsert(data);
    !!callback && callback();
  }
})();

export default scorecardResultService;