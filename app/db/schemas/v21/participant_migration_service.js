const participantMigrationService = (() => {
  return {
    addCountable
  }

  function addCountable(oldRealm, newRealm) {
    const oldParticipants = oldRealm.objects('Participant');
    const newParticipants = newRealm.objects('Participant');

    for (let i = 0; i < oldParticipants.length; i ++) {
      newParticipants[i].countable = !oldParticipants[i].countable ? true : oldParticipants[i].countable;
    }
  }
})();

export default participantMigrationService;