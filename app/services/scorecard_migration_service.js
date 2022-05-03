import Scorecard from '../models/Scorecard';
import settingHelper from '../helpers/setting_helper';

const scorecardMigrationService = (() => {
  return {
    handleScorecardEndpointUrlMigration
  }

  async function handleScorecardEndpointUrlMigration() {
    const { owner, endpoint } = await settingHelper.getCurrentSignInData();
    const scorecards = Scorecard.getAll();
    const endpointUrl = `${owner}@${endpoint}`;

    scorecards.map(scorecard => {
      if (!scorecard.endpoint_url) {
        Scorecard.update(scorecard.uuid, { endpoint_url: endpointUrl });
      }
    });
  }
})();

export default scorecardMigrationService;