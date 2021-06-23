import realm from '../db/schema';
import Rating from '../models/Rating';
import Participant from '../models/Participant'
import VotingCriteria from '../models/VotingCriteria';
import { roundUpHalf } from '../utils/math';
import { participantTypes } from '../constants/participant_constant';

const getVotingInfos = (scorecardUuid, indicatorId) => {
  let votingInfos = [
    { type: 'female', voting_score: 0, average_score: 0, participant: _getVotedParticipantByType(scorecardUuid, 'female') },
    { type: 'disability', voting_score: 0, average_score: 0, participant: _getVotedParticipantByType(scorecardUuid, 'disability') },
    { type: 'minority', voting_score: 0, average_score: 0, participant: _getVotedParticipantByType(scorecardUuid, 'minority') },
    { type: 'poor', voting_score: 0, average_score: 0, participant: _getVotedParticipantByType(scorecardUuid, 'poor') },
    { type: 'youth', voting_score: 0, average_score: 0, participant: _getVotedParticipantByType(scorecardUuid, 'youth') },
  ];

  const votingCriteria = realm.objects('VotingCriteria').filtered(`scorecard_uuid == '${scorecardUuid}' AND indicatorable_id == '${indicatorId}'`)[0];
  const allParticipants = realm.objects('Participant').filtered(`scorecard_uuid == '${scorecardUuid}'`);

  votingInfos.map((votingInfo) => {
    const type = votingInfo.type;
    let participants = allParticipants.filter((participant) => participant[type]);

    if (votingInfo.type == 'female')
      participants = allParticipants.filter((participant) => participant.gender == 'female');

    participants.map((participant) => {
      const rating = Rating.findByVotingCriteriaAndParticipant(votingCriteria.uuid, participant.uuid);
      votingInfo.voting_score += rating != undefined ? rating.score : 0;
    });

    votingInfo.average_score = participants.length > 0 && votingInfo.participant > 0 ? roundUpHalf((votingInfo.voting_score / votingInfo.participant)) : 0;
  });

  return votingInfos;
}

const hasVoting = (scorecardUuid) => {
  return Rating.getAll(scorecardUuid).length > 0 ? true : false;
}

const getVotingParticipants = (scorecardUuid) => {
  let participantInfos = [];

  participantTypes.map((type) => {
    participantInfos.push(_getVotedParticipantByType(scorecardUuid, type));
  });

  return participantInfos;
}

const getSuggestedActionAttrs = (scorecardUuid) => {
  const votingCriterias = VotingCriteria.getAll(scorecardUuid);
  let suggestedActionAttrs = [];

  votingCriterias.map(votingCriteria => {
    const suggestedActions = JSON.parse(votingCriteria.suggested_action);

    suggestedActions.map((suggestedAction, index) => {
      const attrs = {
        voting_indicator_uuid: votingCriteria.uuid,
        scorecard_uuid: scorecardUuid,
        content: suggestedAction,
        selected: votingCriteria.suggested_action_status[index],
      }

      suggestedActionAttrs.push(attrs);
    });
  });

  return suggestedActionAttrs;
}

// Private
const _getVotedParticipantByType = (scorecardUuid, type) => {
  let participants = Participant.getVoted(scorecardUuid);

  if (type == 'female')
    participants = participants.filter((participant) => participant.gender == 'female');
  else
    participants = participants.filter((participant) => participant[type]);

  return participants.length;
}

export { getVotingInfos, hasVoting, getVotingParticipants, getSuggestedActionAttrs };