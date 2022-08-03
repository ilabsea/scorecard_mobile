import Color from '../themes/color';
import ProposedIndicator from '../models/ProposedIndicator';
import Participant from '../models/Participant';
import { MALE } from '../constants/participant_constant';
import { isVotingScreen } from '../utils/screen_util';

const participantHelper = (() => {
  return {
    getGenderIconLabel,
    getItemColor,
    isYouth,
    getParticipantByIndicator,
    getDefaultParticipantInfo,
    isUncountableOptionVisible,
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

  function getItemColor(isSelected, type, disabled) {
    const colors = {
      'border': '#ebebeb',
      'default': Color.grayColor,
    }

    if (disabled) return Color.disableCardColor;
    if (isSelected) return Color.headerColor;

    return colors[type] ?? colors.default;
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

  function isUncountableOptionVisible(scorecardUuid) {
    return isVotingScreen() || Participant.hasUncountable(scorecardUuid);
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
