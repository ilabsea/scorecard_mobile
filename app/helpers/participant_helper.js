import Color from '../themes/color';

const participantHelper = (() => {
  return {
    getGenderIconLabel,
    getItemColor,
    isYouth,
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
})();

export default participantHelper;
