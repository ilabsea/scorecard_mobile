import Scorecard from '../models/Scorecard';
import settingHelper from '../helpers/setting_helper';

const scorecardMigrationService = (() => {
  return {
    handleScorecardEndpointUrlMigration
  }

  async function handleScorecardEndpointUrlMigration() {
    const endpointUrl = await settingHelper.getEndpointUrl();
    const scorecards = Scorecard.getAll();

    if (!endpointUrl) return;

    scorecards.map(scorecard => {
      if (!scorecard.endpoint_url) {
        Scorecard.update(scorecard.uuid, { endpoint_url: endpointUrl });
      }
    });
  }
})();

export default scorecardMigrationService;