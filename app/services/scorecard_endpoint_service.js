import pkg from '../../package';
import settingHelper from '../helpers/setting_helper';
import Scorecard from '../models/Scorecard';
import appStatusService from '../services/app_status_service';

const scorecardEndpointService = (() => {
  return {
    isAppVersionForUpdateScorecard,
    isRequireReauthentication,
    handleUpdateScorecardEndpointUrl,
  }

  // To do: Remove the update endpoint in the future
  // When updating the app to version 1.5.2, user requires to update the reauthenicate in
  // in setting screen to update the endpoint_url of the scorecard that has null on that field
  // because when updating the app from previous version to 1.5.2, some scorecard will have
  // endpoint_url as null or ''
  function isAppVersionForUpdateScorecard() {
    return pkg.version == '1.5.2'
  }

  async function isRequireReauthentication() {
    // If the app v 1.5.2 is first time installed (not from updating), do not show the alert message
    if (await appStatusService.isAppFirstTimeInstalled())
      return false;

    return isAppVersionForUpdateScorecard() && await appStatusService.isFirstTimeAppOpen();
  }

  async function handleUpdateScorecardEndpointUrl() {
    if (!isAppVersionForUpdateScorecard())
      return;

    const endpointUrl = await settingHelper.getEndpointUrl();
    const scorecards = Scorecard.getScorecardsWithoutEndpoint();

    scorecards.map(scorecard => {
      setTimeout(() => {
        Scorecard.update(scorecard.uuid, { endpoint_url: endpointUrl });
      }, 50);
    });
  }
})();

export default scorecardEndpointService;