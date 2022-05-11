import Participant from '../models/Participant';
import ProposedIndicator from '../models/ProposedIndicator';

const saveParticipantInfo = (participant, scorecardUuid, isUpdate, callback) => {
  const participants = Participant.findByScorecard(scorecardUuid);
  let attrs = participant;

  if (!isUpdate)
    attrs.order = participants.length;

  let savedParticipant = null;

  if (!isUpdate)
    Participant.create(attrs);
  else
    Participant.update(attrs.uuid, attrs);

  callback(participants, savedParticipant);
}

const updateRaisedParticipants = (scorecardUuid) => {
  const participants = Participant.getAll(scorecardUuid);
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
