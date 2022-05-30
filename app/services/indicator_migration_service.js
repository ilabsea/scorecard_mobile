import Scorecard from '../models/Scorecard';
import Indicator from '../models/Indicator';
import LanguageIndicator from '../models/LanguageIndicator';

const indicatorMigrationService = (() => {
  return {
    checkAndRemoveIndicatorAndLanguageIndicator
  }

  function checkAndRemoveIndicatorAndLanguageIndicator() {
    if (Scorecard.hasUnsubmitted())
      return;

    Indicator.deleteAll();
    LanguageIndicator.deleteAll();
  }

  // function handleMigrateIndicator() {

  // }
})();

export default indicatorMigrationService;