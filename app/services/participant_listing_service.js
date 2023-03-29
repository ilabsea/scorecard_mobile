import Participant from '../models/Participant';

const participantListingService = (() => {
  return {
    updateParticipantOrder
  }

  function updateParticipantOrder(participants) {
    let newParticipants = participants
    participants.map((participant, index) => {
      if (participant.order != index) {
        newParticipants.order = index;
        Participant.update(participant.uuid, {order: index})
      }
    })
    return newParticipants
  }
})()

export default participantListingService