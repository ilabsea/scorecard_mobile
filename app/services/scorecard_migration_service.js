import Scorecard from '../models/Scorecard';
import ScorecardService from '../services/scorecardService';

const scorecardMigrationService = (() => {
  return {
    handleUpdatingScorecardWithoutProgramUuid,
  }

  function handleUpdatingScorecardWithoutProgramUuid() {
    const scorecards = Scorecard.getScorecardWithoutProgramUuid();

    scorecards.map(scorecard => {
      _findAndUpdateScorecard(scorecard.uuid);
    });
  }

  // private method
  function _findAndUpdateScorecard(scorecardUuid) {
    new ScorecardService().find(scorecardUuid, async (responseData) => {
      if (!!responseData)
        Scorecard.update(scorecardUuid, { program_uuid: responseData.program_uuid })
    });
  }
})();

export default scorecardMigrationService;