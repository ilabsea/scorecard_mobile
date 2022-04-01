import realm from '../db/schema';
import ProposedIndicator from '../models/ProposedIndicator';
const initState = {participants: []};

const getParticipants = (participants, scorecardUUID) => {
  let savedParticipants = [];
  participants.map((participant) => {
    const proposedIndicators = ProposedIndicator.find(scorecardUUID, participant.uuid);
    const attrs = participant
    attrs['proposed_indicators'] = proposedIndicators;
    savedParticipants.push(attrs);
  });
  return savedParticipants;
}

const participantReducer = (state=initState, action) => {
  switch (action.type) {
    case 'SAVE_PARTICIPANT':
      return {participants: getParticipants(action.payload.participants, action.payload.scorecardUUID)};
    default:
      return state;
  }
};

export default participantReducer;
