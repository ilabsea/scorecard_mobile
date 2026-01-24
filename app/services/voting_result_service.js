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
        const scoringResults = votingIndicator.results;
        const scorings = ['very_bad_count', 'bad_count', 'acceptable_count', 'good_count', 'very_good_count'];
        var data = { median: votingIndicator.median }

        scorings.forEach((scoring, index) => {
          data[scoring] = scoringResults[index].vote_count;
        });
        VotingIndicator.update(votingIndicator.uuid, data);
      }
      !!successCallback && successCallback();
    }, (error) => {
      !!errorCallback && errorCallback();
    });
  }
})();

export default votingResultService;