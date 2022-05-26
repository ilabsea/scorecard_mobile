import reLoginService from './re_login_service';
import settingHelper from '../helpers/setting_helper';
import Indicator from '../models/Indicator';
import Scorecard from '../models/Scorecard';

const appStatusService = (() => {
  return {
    handleAppInstallingStatus,
  }

  // Check if the app version 1.5.2 is freshly installed, do not show the alert message
  async function handleAppInstallingStatus() {
    if (reLoginService.isAppVersionForUpdateScorecard() && !await settingHelper.getFullyEndpointUrl()) {
      console.log('=== is first installl ===');
      reLoginService.setHasReLoggedIn();
    }

    if (reLoginService.isAppVersionForUpdateScorecard() && Indicator.hasNoEndpointUrl() && Scorecard.hasUnsubmitted()) {
      console.log('=== clear has re-login status ===');
      reLoginService.clearHasReLogInStatus();
    }
  }
})();

export default appStatusService;