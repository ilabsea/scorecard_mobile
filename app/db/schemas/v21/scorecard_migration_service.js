const scorecardMigrationService = (() => {
  return {
    addRunningStatusUploaded
  }

  function addRunningStatusUploaded(oldRealm, newRealm) {
    const oldScorecards = oldRealm.objects('Scorecard');
    const newScorecards = newRealm.objects('Scorecard');

    for (let i = 0; i < oldScorecards.length; i ++) {
      // If the existing scorecard has milestone as null or downloaded, it means the scorecard didn't upload the running milestone yet
      const isUploaded = (!oldScorecards[i].milestone || oldScorecards[i].milestone == DOWNLOADED) ? false : true;
      newScorecards[i].running_status_uploaded = !oldScorecards[i].running_status_uploaded ? isUploaded : oldScorecards[i].running_status_uploaded;
    }
  }
})();

export default scorecardMigrationService;