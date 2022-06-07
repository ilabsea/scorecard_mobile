const scorecardMigrationService = (() => {
  return {
    addProgramUuid,
  }

  function addProgramUuid(oldRealm, newRealm) {
    const oldScorecards = oldRealm.objects('Scorecard');
    const newScorecards = newRealm.objects('Scorecard');

    oldScorecards.map((oldScorecard, index) => {
      newScorecards[index].program_uuid = !oldScorecard.program_uuid ? '' : oldScorecard.program_uuid;
    });
  }
})();

export default scorecardMigrationService;