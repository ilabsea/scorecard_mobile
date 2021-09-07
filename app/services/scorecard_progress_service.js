import votingCriteriaService from './votingCriteriaService';
import { VOTING } from '../constants/scorecard_step_constant';

const scorecardProgressService = (() => {
  return {
    isAllowToFinish,
    getProgressMessage,
  }

  function isAllowToFinish(scorecard) {
    if (scorecard.finished)
      return false;

    const votingCriterias = votingCriteriaService.getAll(scorecard.uuid);

    if (votingCriterias.length == 0)
      return false;

    return votingCriterias.filter(criteria => !criteria.suggested_action).length > 0 ? false : true;
  }

  function getProgressMessage(criterias, scorecard) {
    let message = '';
    if (scorecard.finished)
      return '';

    if (scorecard.status < VOTING)
      message = 'pleaseCompleteAllTheSteps';
    else if (!_isAllCriteriaVoted(criterias, scorecard.uuid))
      message = 'allCriteriaMustBeVoted';
    else if (!isAllowToFinish(scorecard))
      message = 'allCriteriaMustHaveSuggestedAction';

    return message;
  }

  // private method
  function _isAllCriteriaVoted(criterias, scorecardUuid) {
    let votingCriterias = criterias.length > 0 ? criterias : votingCriteriaService.getAll(scorecardUuid);

    return votingCriterias.filter(criteria => !criteria.median).length > 0 ? false : true;
  }
})();

export default scorecardProgressService;