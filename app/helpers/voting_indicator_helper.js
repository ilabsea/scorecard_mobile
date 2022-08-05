import React from 'react';
import { Image } from 'react-native';
import Rating from '../models/Rating';
import Participant from '../models/Participant'
import VotingIndicator from '../models/VotingIndicator';
import { roundUpHalf } from '../utils/math';
import { participantTypes } from '../constants/participant_constant';
import Images from '../utils/images';

const getVotingInfos = (scorecardUuid, indicatorId) => {
  let votingInfos = [
    { type: 'female', voting_score: 0, average_score: 0, participant: _getVotedParticipantByType(scorecardUuid, 'female') },
    { type: 'disability', voting_score: 0, average_score: 0, participant: _getVotedParticipantByType(scorecardUuid, 'disability') },
    { type: 'minority', voting_score: 0, average_score: 0, participant: _getVotedParticipantByType(scorecardUuid, 'minority') },
    { type: 'poor', voting_score: 0, average_score: 0, participant: _getVotedParticipantByType(scorecardUuid, 'poor') },
    { type: 'youth', voting_score: 0, average_score: 0, participant: _getVotedParticipantByType(scorecardUuid, 'youth') },
  ];

  const votingIndicator = VotingIndicator.filterByIndicator(scorecardUuid, indicatorId, null)[0];
  const allParticipants = Participant.getAllCountable(scorecardUuid);

  votingInfos.map((votingInfo) => {
    const type = votingInfo.type;
    let participants = allParticipants.filter((participant) => participant[type]);

    if (votingInfo.type == 'female')
      participants = allParticipants.filter((participant) => participant.gender == 'female');

    participants.map((participant) => {
      const rating = Rating.findByVotingIndicatorAndParticipant(votingIndicator.uuid, participant.uuid);
      votingInfo.voting_score += rating != undefined ? rating.score : 0;
    });

    votingInfo.average_score = participants.length > 0 && votingInfo.participant > 0 ? roundUpHalf((votingInfo.voting_score / votingInfo.participant)) : 0;
  });

  return votingInfos;
}

const hasVoting = (scorecardUuid) => {
  const votingIndicators = VotingIndicator.getAll(scorecardUuid);

  for (let i = 0; i < votingIndicators.length; i++) {
    if (!isVotingIndicatorRated(votingIndicators[i].uuid))
      return false;
  }

  return true;
}

const getVotingParticipants = (scorecardUuid) => {
  let participantInfos = [];

  participantTypes.map((type) => {
    participantInfos.push(_getVotedParticipantByType(scorecardUuid, type));
  });

  return participantInfos;
}

const isVotingIndicatorRated = (votingIndicatorUuid) => {
  return Rating.findByVotingIndicator(votingIndicatorUuid) ? true : false;
}

const getVotingIcon = (icon, size, ratio) => {
  let sizeRatio = size * ratio;

  return (
    <Image source={Images[icon.image]} style={{width: sizeRatio, height: sizeRatio, maxWidth: size, maxHeight: size}} />
  )
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

export { getVotingInfos, hasVoting, getVotingParticipants, isVotingIndicatorRated, getVotingIcon };
