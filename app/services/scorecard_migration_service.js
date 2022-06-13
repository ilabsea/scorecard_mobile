import Scorecard from '../models/Scorecard';
import ScorecardService from '../services/scorecardService';
import indicatorMigrationService from '../services/indicator_migration_service';
import settingHelper from '../helpers/setting_helper';

const scorecardMigrationService = (() => {
  return {
    handleUpdatingScorecardWithoutProgramUuid,
  }

  function handleUpdatingScorecardWithoutProgramUuid() {
    if (!Scorecard.hasUnsubmitted())
      return;

    const scorecards = Scorecard.getScorecardWithoutProgramUuid();

    scorecards.map(scorecard => {
      _findAndUpdateScorecard(scorecard.uuid);
    });
  }

  // private method
  function _findAndUpdateScorecard(scorecardUuid) {
    new ScorecardService().find(scorecardUuid, async (responseData) => {
      if (!!responseData) {
        Scorecard.update(scorecardUuid, { 
          program_uuid: responseData.program_uuid,
          endpoint_url: await settingHelper.getFullyEndpointUrl()
        });
        // Add program_uuid and endpoint_id to the indicators that have relation to the scorecard
        indicatorMigrationService.handleUpdateIndicator(scorecardUuid, responseData.facility_id);
      }
    });
  }
})();

export default scorecardMigrationService;