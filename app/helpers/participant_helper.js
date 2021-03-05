const participantHelper = (() => {
  return {
    getGenderIconLabel,
  };

  function getGenderIconLabel(gender) {
    return gender === 'other' ? 'transgender' : gender == 'female' ? 'venus' : 'mars';
  }
})();

export default participantHelper;