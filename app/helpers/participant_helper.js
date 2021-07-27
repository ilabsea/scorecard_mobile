import Color from '../themes/color';
import ProposedCriteria from '../models/ProposedCriteria';
import Participant from '../models/Participant';

const participantHelper = (() => {
  return {
    getGenderIconLabel,
    getItemColor,
    isYouth,
    getParticipantByIndicator,
  };

  function getGenderIconLabel(gender) {
    switch(gender) {
      case 'female':
        return 'venus';
      case 'male':
        return 'mars';
      default:
        return 'transgender';
    }
  }

  function getItemColor(isSelected, type) {
    if (isSelected)
      return Color.headerColor;

    return type == 'border' ? '#ebebeb' : 'gray';
  }

  function isYouth(age) {
    return age >= 15 && age <= 30;
  }

  function getParticipantByIndicator(scorecardUuid, indicatorableId) {
    const proposedCriterias = ProposedCriteria.findByIndicator(scorecardUuid, indicatorableId);
    const participantOrderNumbers = [];

    proposedCriterias.map(criteria => {
      const participant = Participant.find(criteria.participant_uuid);

      participantOrderNumbers.push(participant.order + 1);
    });

    return participantOrderNumbers.sort((a, b) => a > b);
  }
})();

export default participantHelper;
