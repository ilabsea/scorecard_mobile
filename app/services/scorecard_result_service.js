const scorecardResultService = (() => {
  return {
    isAllowToFinish,
  };

  function isAllowToFinish(scorecard, criterias) {
    if (scorecard.finished)
      return false;

    for (let i=0; i<criterias.length; i++) {
      const criteria = criterias[i];

      if (!criteria.suggested_action)
        return false;
    }

    return true;
  }
})();

export default scorecardResultService;