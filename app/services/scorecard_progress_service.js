import { VOTING } from '../constants/scorecard_step_constant';
import VotingIndicator from '../models/VotingIndicator';

const scorecardProgressService = (() => {
  return {
    isAllowToFinish,
    getProgressMessage,
  }

  function isAllowToFinish(scorecard) {
    if (scorecard.finished)
      return false;

    const votingIndicators = VotingIndicator.getAll(scorecard.uuid);

    if (votingIndicators.length == 0)
      return false;

    return votingIndicators.filter(votingIndicator => !votingIndicator.suggested_action).length > 0 ? false : true;
  }

  function getProgressMessage(indicators, scorecard) {
    if (scorecard.finished)
      return '';

    let votingIndicators = indicators.length > 0 ? indicators : VotingIndicator.getAll(scorecard.uuid);
    const messages = [
      { label: scorecard.status < VOTING ? 'pleaseCompleteAllTheSteps' : null },
      { label: votingIndicators.filter(votingIndicator => !votingIndicator.median).length > 0 ? 'allIndicatorMustBeVoted' : null },
      { label: votingIndicators.filter(votingIndicator => !votingIndicator.suggested_action).length > 0 ? 'allIndicatorMustHaveSuggestedAction' : null },
    ]
    const infoMessages = messages.filter(message => message.label);
    return infoMessages.length > 0 ? infoMessages[0].label : '';
  }
})();

export default scorecardProgressService;