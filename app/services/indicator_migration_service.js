import Scorecard from '../models/Scorecard';
import Indicator from '../models/Indicator';
import LanguageIndicator from '../models/LanguageIndicator';
import reLoginService from '../services/re_login_service';

const indicatorMigrationService = (() => {
  return {
    handleDeleteAllIndicator
  }

  function handleDeleteAllIndicator() {
    if (!reLoginService.isAppVersionForUpdateScorecard() || Scorecard.hasUnsubmitted())
      return;

    console.log('===== start delete indicator and lang inidcator =====')
    Indicator.deleteAll();
    LanguageIndicator.deleteAll();
    reLoginService.setHasReLoggedIn();
  }
})();

export default indicatorMigrationService;