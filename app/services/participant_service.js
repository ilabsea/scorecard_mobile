import Participant from '../models/Participant';
import ProposedIndicator from '../models/ProposedIndicator';
import uuidv4 from '../utils/uuidv4';

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

const createAnonymousParticipant = (scorecardUuid, callback) => {
  const existingAnonymous = Participant.getAnonymousByScorecard(scorecardUuid).length;
  if (existingAnonymous== 0) {
    let attrs = {
      uuid: uuidv4(),
      age: -1,
      gender: 'other',
      disability: false,
      minority: false,
      poor: false,
      youth: false,
      scorecard_uuid: scorecardUuid,
      order: 98,
      countable: false
    };
    Participant.create(attrs);
  }
  const participants = Participant.getAllByScorecard(scorecardUuid);

  setTimeout(() => {
    callback(participants);
  }, 20);
}

export {
  saveParticipantInfo,
  updateRaisedParticipants,
  createAnonymousParticipant
};
