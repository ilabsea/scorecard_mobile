import Scorecard from '../models/Scorecard';
import settingHelper from '../helpers/setting_helper';
import reLoginService from './re_login_service';

const scorecardEndpointService = (() => {
  return {
    handleScorecardEndpointUrlMigration,
    handleUpdateScorecardWithoutEndpointUrl
  }

  async function handleScorecardEndpointUrlMigration() {
    const endpointUrl = await settingHelper.getFullyEndpointUrl();

    if (!endpointUrl) return;

    _updateScorecardEndpoint(endpointUrl);
  }

  async function handleUpdateScorecardWithoutEndpointUrl() {
    if (reLoginService.isReLoggedIn())
      return;

    const endpointUrl = await settingHelper.getFullyEndpointUrl();
    _updateScorecardEndpoint(endpointUrl);
  }

  // private method
  function _updateScorecardEndpoint(endpointUrl) {
    const scorecards = Scorecard.getScorecardsWithoutEndpoint();

    scorecards.map(scorecard => {
      setTimeout(() => {
        Scorecard.update(scorecard.uuid, { endpoint_url: endpointUrl });
      }, 50);
    });
  }
})();

export default scorecardEndpointService;