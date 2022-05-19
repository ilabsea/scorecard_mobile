import Scorecard from '../models/Scorecard';
import settingHelper from '../helpers/setting_helper';
import reLoginService from './re_login_service';

const scorecardEndpointService = (() => {
  return {
    handleScorecardEndpointUrlMigration,
    handleUpdateScorecardWithoutEndpointUrl
  }

  async function handleScorecardEndpointUrlMigration() {
    const endpointUrl = await settingHelper.getEndpointUrlForScorecard();

    if (!endpointUrl) return;

    _updateScorecardEndpoint(endpointUrl);
  }

  async function handleUpdateScorecardWithoutEndpointUrl() {
    if (!reLoginService.isAppVersionForUpdateScorecard())
      return;

    const endpointUrl = await settingHelper.getEndpointUrlForScorecard();
    _updateScorecardEndpoint(endpointUrl);
    reLoginService.setHasReLoggedIn();
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