const scorecardResultService = (() => {
  return {
    hasSwotData,
  };

  function hasSwotData(criterias) {
    for (let i=0; i<criterias.length; i++) {
      const criteria = criterias[i];

      if (criteria.strength || criteria.weakness || criteria.suggestedAction)
        return true;
    }

    return false;
  }
})();

export default scorecardResultService;