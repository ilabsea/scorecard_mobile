const scorecardMigrationService = (() => {
  return {
    addProposedIndicatorMethod
  }

  function addProposedIndicatorMethod(oldRealm, newRealm) {
    if (oldRealm.schemaVersion < 21) {
      const oldScorecards = oldRealm.objects('Scorecard');
      const newScorecards = newRealm.objects('Scorecard');

      for (let i = 0; i < oldScorecards.length; i ++) {
        newScorecards[i].proposed_indicator_method = !oldScorecards[i].proposed_indicator_method ? null : oldScorecards[i].proposed_indicator_method;
      }
    }
  }
})();

export default scorecardMigrationService;