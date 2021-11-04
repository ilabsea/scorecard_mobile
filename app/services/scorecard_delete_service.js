import Scorecard from '../models/Scorecard';
import Participant from '../models/Participant';
import Facilitator from '../models/Facilitator';
import Rating from '../models/Rating';
import CustomIndicator from '../models/CustomIndicator';
import LanguageIndicator from '../models/LanguageIndicator';

import { deleteScorecardDownload } from './scorecard_download_service';
import scorecardMilestoneService from './scorecard_milestone_service';
import votingCriteriaService from './votingCriteriaService';
import proposedCriteriaService from './proposedCriteriaService';
import scorecardSharingService from './scorecard_sharing_service';

import { RENEWED } from '../constants/milestone_constant';

const scorecardDeleteService = (() => {
  return {
    deleteScorecard,
    deleteExpiredScorecardCard,
  }

  function deleteScorecard(scorecardUuid, callback, errorCallback) {
    const scorecard = Scorecard.find(scorecardUuid);

    if (scorecard.isUploaded)
      return;

    scorecardMilestoneService.updateMilestone(scorecardUuid, null, RENEWED, () => {
      _deleteScorecardData(scorecardUuid, callback);
    }, (res) => !!errorCallback && errorCallback(res));
  }

  function deleteExpiredScorecardCard() {
    const scorecards = Scorecard.getSubmittedExpired();

    scorecards.map(scorecard => {
      _deleteScorecardData(scorecard.uuid, null);
    });
  }

  // private method
  function _deleteScorecardData(scorecardUuid, callback) {
    Participant.deleteAll(scorecardUuid);
    deleteScorecardDownload(scorecardUuid);
    Scorecard.destroy(scorecardUuid);
    Facilitator.deleteAll(scorecardUuid);
    Rating.deleteAll(scorecardUuid);
    CustomIndicator.deleteAll(scorecardUuid);
    LanguageIndicator.deleteAll(scorecardUuid);
    votingCriteriaService.deleteVotingCriteria(scorecardUuid);
    proposedCriteriaService.deleteProposedCriterias(scorecardUuid);
    scorecardSharingService.deleteScorecardPdf(scorecardUuid);

    callback && callback();
  }
})();

export default scorecardDeleteService;