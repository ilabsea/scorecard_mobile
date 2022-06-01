import Scorecard from '../models/Scorecard';
import Indicator from '../models/Indicator';
import LanguageIndicator from '../models/LanguageIndicator';
import IndicatorService from './indicator_service';

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
    const predefeinedIndicatorsWithoutUuid = Indicator.getPredefeinedIndicatorsWithoutUuid(facilityId);
    // If there is an indicator that doesn't have indicator_uuid (indicators from older version) then
    // delete the existing indicator and send request to server to create new indicator in realm
    if (predefeinedIndicatorsWithoutUuid.length > 0) {
      Indicator.destroy(predefeinedIndicatorsWithoutUuid);
      new IndicatorService().saveIndicatorSection(scorecardUuid, facilityId);
    }

    // Add program_uuid and endpoint_id to predefined and custom indicators
    _updateIndicator(scorecardUuid, facilityId);
  }

  // private method
  function _updateIndicator(scorecardUuid, facilityId) {
    const indicators = Indicator.getIndicatorsWithoutProgramUuidOrEndpointId(scorecardUuid, facilityId);
    indicators.map(indicator => {
      Indicator.update(indicator.uuid, { facility_id: facilityId }, scorecardUuid);
    });
  }
})();

export default indicatorMigrationService;