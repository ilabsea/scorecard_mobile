import Participant from '../models/Participant';
import ProposedIndicator from '../models/ProposedIndicator';

const saveParticipantInfo = (participant, scorecardUuid, isUpdate, callback) => {
  const participants = Participant.getAllByScorecard(scorecardUuid);
  let attrs = participant;

  if (!isUpdate) {
    attrs.order = attrs.countable ? Participant.getAllCountable(scorecardUuid).length : 98;
    Participant.create(attrs);
  }
  else
    Participant.update(attrs.uuid, attrs);

  setTimeout(() => {
    const savedParticipant = Participant.find(attrs.uuid);
    callback(participants, savedParticipant);
  }, 20);
}

const updateRaisedParticipants = (scorecardUuid) => {
  const participants = Participant.getAllByScorecard(scorecardUuid);
  participants.map(participant => {
    let isRaised = false;
    if (!!ProposedIndicator.findByParticipant(scorecardUuid, null, participant.uuid))
      isRaised = true;

    Participant.update(participant.uuid, { raised: isRaised });
  });
}

export {
  saveParticipantInfo,
  updateRaisedParticipants,
};
