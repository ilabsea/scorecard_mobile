import Color from '../themes/color';

const scorecardResultHelper = (() => {
  return {
    getValidSuggestedStatuses,
    btnTextColor,
  };

  function getValidSuggestedStatuses(points, selectedActions) {
    let validSuggestedActions = []

    points.map((point, index) => {
      if (point)
        validSuggestedActions.push(selectedActions[index]);
    });

    return validSuggestedActions;
  }

  function btnTextColor(isScorecardFinished, indicator, defaultColor) {
    return (isScorecardFinished || !indicator.median) ? { color: Color.grayColor } : { color: defaultColor };
  }
})();

export default scorecardResultHelper;