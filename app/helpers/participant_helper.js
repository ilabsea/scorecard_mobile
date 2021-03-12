import Color from '../themes/color';

const participantHelper = (() => {
  return {
    getGenderIconLabel,
    getItemColor,
    getAttributes,
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

  function getItemColor(isSelected, unSelectedColor) {
    return isSelected ? Color.primaryColor : unSelectedColor;
  }

  function getAttributes(state, translations) {
    const { isDisability, isMinority, isPoor, isYouth } = state;

    const participantAttrs = {
      firstRow: [
        { iconName: 'wheelchair', fieldName: 'isDisability', isSelected: isDisability, title: translations.disability },
        { iconName: 'users', fieldName: 'isMinority', isSelected: isMinority, title: translations.minority },
        { iconName: 'id-card', fieldName: 'isPoor', isSelected: isPoor, title: translations.poor },
      ],
      secondRow: [
        { iconName: 'universal-access', fieldName: 'isYouth', isSelected: isYouth, title: translations.youth },
        null,
        null,
      ]
    };

    return participantAttrs;
  }
})();

export default participantHelper;
