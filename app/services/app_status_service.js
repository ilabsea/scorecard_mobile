import reLoginService from './re_login_service';
import settingHelper from '../helpers/setting_helper';

const appStatusService = (() => {
  return {
    handleAppInstallingStatus,
  }

  // Check if the app version 1.5.2 is freshly installed, do not show the alert message
  async function handleAppInstallingStatus() {
    if (reLoginService.isAppVersionForUpdateScorecard() && !await settingHelper.getEndpointUrl())
      reLoginService.setHasReLoggedIn();
  }
})();

export default appStatusService;