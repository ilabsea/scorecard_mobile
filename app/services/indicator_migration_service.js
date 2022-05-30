import Scorecard from '../models/Scorecard';
import Indicator from '../models/Indicator';
import LanguageIndicator from '../models/LanguageIndicator';

const indicatorMigrationService = (() => {
  return {
    checkAndRemoveIndicatorAndLanguageIndicator,
    handleUpdateIndicator,
  }

  function checkAndRemoveIndicatorAndLanguageIndicator() {
    if (Scorecard.hasUnsubmitted())
      return;

    Indicator.deleteAll();
    LanguageIndicator.deleteAll();
  }

  function handleUpdateIndicator(scorecardUuid, facilityId) {
    // Find the indicators that doesn't have program_uuid or endpoint_id by the facility_id of the scorecard
    const indicators = Indicator.getIndicatorsWithoutProgramUuidOrEndpointId(facilityId);
    indicators.map(indicator => {
      Indicator.update(indicator.uuid, { facility_id: facilityId }, scorecardUuid);
    });
  }
})();

export default indicatorMigrationService;