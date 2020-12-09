import realm from '../db/schema';
const initState = {participants: []};

const getParticipants = (participants, scorecardUUID) => {
  let savedParticipants = [];
  participants.map((participant) => {
    const proposedCriterias = realm.objects('ProposedCriteria').filtered('scorecard_uuid = "'+ scorecardUUID +'" AND participant_uuid = "'+ participant.uuid +'"');
    const attrs = participant
    attrs['proposed_criterias'] = proposedCriterias;
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
