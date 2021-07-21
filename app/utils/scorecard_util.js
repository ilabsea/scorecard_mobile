export const getUniqueScorecards = (scorecards) => {
  return scorecards.filter((scorecard, index, array) => array.findIndex(t => t.uuid == scorecard.uuid) == index);
}