import realm from '../db/schema';
import ratingService from '../services/ratingService';
import ScorecardService from '../services/scorecardService';
import { roundUpHalf } from '../utils/math';

const getVotingInfos = (scorecardUuid, indicatorId) => {
  const scorecardService = new ScorecardService();
  const scorecard = scorecardService.find(scorecardUuid);

  let votingInfos = [
    { type: 'female', voting_score: 0, average_score: 0, participant: scorecard.number_of_female },
    { type: 'disability', voting_score: 0, average_score: 0, participant: scorecard.number_of_disability },
    { type: 'minority', voting_score: 0, average_score: 0, participant: scorecard.number_of_ethnic_minority },
    { type: 'poor', voting_score: 0, average_score: 0, participant: scorecard.number_of_id_poor },
    { type: 'youth', voting_score: 0, average_score: 0, participant: scorecard.number_of_youth },
  ];

  const votingCriteria = realm.objects('VotingCriteria').filtered(`scorecard_uuid == '${scorecardUuid}' AND indicatorable_id == '${indicatorId}'`)[0];
  const allParticipants = realm.objects('Participant').filtered(`scorecard_uuid == '${scorecardUuid}'`);

  votingInfos.map((votingInfo) => {
    const type = votingInfo.type;
    let participants = allParticipants.filter((participant) => participant[type]);

    if (votingInfo.type == 'female')
      participants = allParticipants.filter((participant) => participant.gender == 'female');

    participants.map((participant) => {
      const rating = ratingService.findByVotingCriteriaAndParticipant(votingCriteria.uuid, participant.uuid);
      votingInfo.voting_score += rating != undefined ? rating.score : 0;
    });

    votingInfo.average_score = participants.length > 0 && votingInfo.participant > 0 ? roundUpHalf((votingInfo.voting_score / votingInfo.participant)) : 0;
  });

  return votingInfos;
}

export { getVotingInfos };