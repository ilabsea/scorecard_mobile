const scorecardResultHelper = (() => {
  return {
    getValidSuggestedStatuses,
  };

  function getValidSuggestedStatuses(points, selectedActions) {
    let validSuggestedActions = []

    points.map((point, index) => {
      if (point)
        validSuggestedActions.push(selectedActions[index]);
    });

    return validSuggestedActions;
  }
})();

export default scorecardResultHelper;