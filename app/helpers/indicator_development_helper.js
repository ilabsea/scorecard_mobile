import { getPluralOrSingularWord } from '../utils/translation_util';

const indicatorDevelopmentHelper = (() => {
  return {
    getCardSubtitle
  }

  function getCardSubtitle(proposedIndicator, translations, appLanguage) {
    const label = `${translations.proposedTimes}: ${proposedIndicator.proposed_count} ${getPluralOrSingularWord(proposedIndicator.proposed_count, translations.time, appLanguage, 's')}`

    if (proposedIndicator.anonymous_count > 0)
      return `${label} (${translations.anonymous} ${proposedIndicator.anonymous_count})`

    return label
  }
})()

export default indicatorDevelopmentHelper