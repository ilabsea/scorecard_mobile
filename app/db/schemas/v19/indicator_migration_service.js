const indicatorMigrationService = (() => {
  return {
    addProgramUuidAndEndpointId,
  }

  function addProgramUuidAndEndpointId(oldRealm, newRealm) {
    const oldIndicators = oldRealm.objects('Indicator');
    const newIndicators = newRealm.objects('Indicator');

    oldIndicators.map((oldIndicator, index) => {
      newIndicators[index].program_uuid = !oldIndicator.program_uuid ? '' : oldIndicator.program_uuid;
      newIndicators[index].endpoint_id = !oldIndicator.endpoint_id ? null : oldIndicator.endpoint_id;
    });
  }
})();

export default indicatorMigrationService;