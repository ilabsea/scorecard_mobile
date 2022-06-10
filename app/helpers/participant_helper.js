import Color from '../themes/color';
import ProposedIndicator from '../models/ProposedIndicator';
import Participant from '../models/Participant';
import { MALE } from '../constants/participant_constant';

const participantHelper = (() => {
  return {
    getGenderIconLabel,
    getItemColor,
    isYouth,
    getParticipantByIndicator,
    getDefaultParticipantInfo,
  };

  function getGenderIconLabel(gender) {
    switch(gender) {
      case 'female':
        return 'venus';
      case 'male':
        return 'mars';
      default:
        // return 'user-circle';
        return 'transgender-alt';
        // return 'transgender';
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
    const proposedIndicators = ProposedIndicator.findByIndicator(scorecardUuid, indicatorableId);
    const participantOrderNumbers = [];

    proposedIndicators.map(indicator => {
      const participant = Participant.find(indicator.participant_uuid);
      if (!!participant)
        participantOrderNumbers.push(participant.order + 1);
    });

    return participantOrderNumbers.sort((a, b) => a > b);
  }

  function getDefaultParticipantInfo(selectedParticipant) {
    const fieldNames = ['age', 'gender', 'disability', 'minority', 'poor', 'youth'];
    let defaultValue = {};

    fieldNames.map(fieldName => {
      defaultValue[fieldName] = _getDefaultValueByFieldName(fieldName, selectedParticipant);
    });

    return defaultValue;
  }

  // private method
  function _getDefaultValueByFieldName(fieldName, selectedParticipant) {
    const defaultValue = {
      'age': 0,
      'gender': MALE,
      'disability': false,
      'minority': false,
      'poor': false,
      'youth': false,
    }

    return !!selectedParticipant ? selectedParticipant[fieldName] : defaultValue[fieldName];
  }
})();

export default participantHelper;
