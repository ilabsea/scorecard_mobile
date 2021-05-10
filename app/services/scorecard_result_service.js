const scorecardResultService = (() => {
  return {
    hasSwotData,
    isAllowToFinish,
  };

  function hasSwotData(criterias) {
    for (let i=0; i<criterias.length; i++) {
      const criteria = criterias[i];

      if (criteria.strength || criteria.weakness || criteria.suggested_action)
        return true;
    }

    return false;
  }

  function isAllowToFinish(scorecard, criteria) {
    if (scorecard.finished)
      return false;

    return hasSwotData(criteria);
  }
})();

export default scorecardResultService;