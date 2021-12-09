import { VOTING } from '../constants/scorecard_step_constant';
import VotingCriteria from '../models/VotingCriteria';

const scorecardProgressService = (() => {
  return {
    isAllowToFinish,
    getProgressMessage,
  }

  function isAllowToFinish(scorecard) {
    if (scorecard.finished)
      return false;

    const votingCriterias = VotingCriteria.getAll(scorecard.uuid);

    if (votingCriterias.length == 0)
      return false;

    return votingCriterias.filter(criteria => !criteria.suggested_action).length > 0 ? false : true;
  }

  function getProgressMessage(criterias, scorecard) {
    if (scorecard.finished)
      return '';

    let votingCriterias = criterias.length > 0 ? criterias : VotingCriteria.getAll(scorecard.uuid);
    const messages = [
      { label: scorecard.status < VOTING ? 'pleaseCompleteAllTheSteps' : null },
      { label: votingCriterias.filter(criteria => !criteria.median).length > 0 ? 'allIndicatorMustBeVoted' : null },
      { label: votingCriterias.filter(criteria => !criteria.suggested_action).length > 0 ? 'allIndicatorMustHaveSuggestedAction' : null },
    ]
    const infoMessages = messages.filter(message => message.label);
    return infoMessages.length > 0 ? infoMessages[0].label : '';
  }
})();

export default scorecardProgressService;