import LanguageIndicator from '../models/LanguageIndicator';

const customIndicatorHelper = (() => {
  return {
    getCustomIndicatorData
  };

  function getCustomIndicatorData(indicator) {
    const languageIndicator = LanguageIndicator.findByIndicatorUuid(indicator.uuid);
    const audio = !!languageIndicator.local_audio ? `file:/${languageIndicator.local_audio}` : null;

    return {
      custom_indicator: {
        uuid: indicator.uuid,
        name: indicator.name,
        tag_attributes: { name: indicator.tag },
      },
      audio: audio,
    }
  }
})();

export default customIndicatorHelper;