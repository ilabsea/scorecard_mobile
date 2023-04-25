const indicatorDevelopmentHelper = (() => {
  return {
    getCardSubtitle
  }

  function getCardSubtitle(proposedIndicator, translations) {
    let label = translations.formatString(translations.numberOfRaisedParticipant, proposedIndicator.proposed_count)
    if (proposedIndicator.anonymous_count > 0)
      label += ` (${translations.anonymous} ${proposedIndicator.anonymous_count})`

    return label
  }
})()

export default indicatorDevelopmentHelper