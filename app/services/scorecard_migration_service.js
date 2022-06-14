import Scorecard from '../models/Scorecard';
import ScorecardService from '../services/scorecardService';
import indicatorMigrationService from '../services/indicator_migration_service';
import settingHelper from '../helpers/setting_helper';

const scorecardMigrationService = (() => {
  return {
    handleUpdatingScorecardWithoutProgramUuid,
  }

  async function handleUpdatingScorecardWithoutProgramUuid() {
    if (!Scorecard.hasUnsubmitted())
      return;

    const scorecards = Scorecard.getScorecardWithoutProgramUuid();
    const fullyEndpointUrl = await settingHelper.getFullyEndpointUrl();

    scorecards.map(scorecard => {
      _findAndUpdateScorecard(scorecard.uuid, fullyEndpointUrl);
    });
  }

  // private method
  function _findAndUpdateScorecard(scorecardUuid, fullyEndpointUrl) {
    new ScorecardService().find(scorecardUuid, (responseData) => {
      if (!!responseData) {
        Scorecard.update(scorecardUuid, { 
          program_uuid: responseData.program_uuid,
          endpoint_url: fullyEndpointUrl
        });
        // Add program_uuid and endpoint_id to the indicators that have relation to the scorecard
        indicatorMigrationService.handleUpdateIndicator(scorecardUuid, responseData.facility_id);
      }
    });
  }
})();

export default scorecardMigrationService;