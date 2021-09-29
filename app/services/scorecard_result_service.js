import VotingCriteria from '../models/VotingCriteria';

const scorecardResultService = (() => {
  return {
    isSaveAble
  };

  function isSaveAble(scorecard) {
    if (scorecard.finished)
      return false;

    const criterias = VotingCriteria.getAll(scorecard.uuid);
    for (let i=0; i<criterias.length; i++) {
      const criteria = criterias[i];
  
      if (!criteria.suggested_action)
        return false;
    }

    return true;
  }
})();

export default scorecardResultService;