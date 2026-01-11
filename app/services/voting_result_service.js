import ScorecardApi from '../api/ScorecardApi';
import { handleApiResponse } from './api_service';
import VotingIndicator from '../models/VotingIndicator';

const scorecardApi = new ScorecardApi();

const votingResultService = (() => {
  return {
    getVotingResultsByScorecard
  }

  async function getVotingResultsByScorecard(scorecardUuid, successCallback, errorCallback) {
    const response = await scorecardApi.getVotingResults(scorecardUuid);
    handleApiResponse(response, (votingIndicators) => {
      for (var i = 0; i < votingIndicators.length; i++) {
        const votingIndicator = votingIndicators[i];
        VotingIndicator.update(votingIndicator.uuid, { median: votingIndicator.median });
      }
      !!successCallback && successCallback();
    }, (error) => {
      !!errorCallback && errorCallback();
    });
  }
})();

export default votingResultService;