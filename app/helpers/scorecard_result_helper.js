import Color from '../themes/color';

const scorecardResultHelper = (() => {
  return {
    getValidSuggestedStatuses,
    btnTextColor,
    isSuggestedAction,
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
    return (isScorecardFinished || !indicator.median) ? { color: Color.disabledBtnBg } : { color: defaultColor };
  }

  function isSuggestedAction(currentFieldName) {
    return currentFieldName === 'suggested_action';
  }
})();

export default scorecardResultHelper;