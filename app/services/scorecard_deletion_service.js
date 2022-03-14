import Scorecard from '../models/Scorecard';
import Participant from '../models/Participant';
import Facilitator from '../models/Facilitator';
import Rating from '../models/Rating';
import LanguageIndicator from '../models/LanguageIndicator';

import { deleteScorecardDownload } from './scorecard_download_service';
import scorecardMilestoneService from './scorecard_milestone_service';
import votingIndicatorService from './voting_indicator_service';
import proposedIndicatorService from './proposed_indicator_service';
import scorecardSharingService from './scorecard_sharing_service';
import customIndicatorService from './custom_indicator_service';

import { RENEWED } from '../constants/milestone_constant';

const scorecardDeletionService = (() => {
  return {
    deleteScorecard,
    deleteExpiredScorecardCard,
  }

  function deleteScorecard(scorecardUuid, callback, errorCallback) {
    const scorecard = Scorecard.find(scorecardUuid);

    if (scorecard.isUploaded)
      return;

    const params = {
      scorecardUuid: scorecardUuid,
      milestone: RENEWED,
    }
    scorecardMilestoneService.updateMilestone(params, null, () => {
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
    customIndicatorService.deleteIndicatorsByScorecard(scorecardUuid);
    Scorecard.destroy(scorecardUuid);
    Facilitator.deleteAll(scorecardUuid);
    Rating.deleteAll(scorecardUuid);
    LanguageIndicator.deleteAll(scorecardUuid);
    votingIndicatorService.deleteVotingIndicators(scorecardUuid);
    proposedIndicatorService.deleteProposedIndicators(scorecardUuid);
    scorecardSharingService.deleteScorecardPdf(scorecardUuid);

    callback && callback();
  }
})();

export default scorecardDeletionService;