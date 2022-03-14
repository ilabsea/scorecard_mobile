import VotingIndicator from '../models/VotingIndicator';

const scorecardResultService = (() => {
  return {
    isSaveAble
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
})();

export default scorecardResultService;