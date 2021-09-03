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

    for (let i=0; i<votingCriterias.length; i++) {
      if (!votingCriterias[i].suggested_action)
        return false;
    }

    return true;
  }

  function getProgressMessage(criterias, scorecard) {
    if (scorecard.status < VOTING)
      return 'pleaseCompleteAllTheSteps'
    else if (!_isAllCriteriaVoted(criterias, scorecard.uuid))
      return 'allCriteriaMustBeVoted';

    return !isAllowToFinish(scorecard) ? 'allCriteriaMustHaveSuggestedAction' : '';
  }

  // private method
  function _isAllCriteriaVoted(criterias, scorecardUuid) {
    let votingCriterias = criterias.length > 0 ? criterias : votingCriteriaService.getAll(scorecardUuid);

    for (let i=0; i<votingCriterias.length; i++) {
      console.log(`voting criteria ${i} = ${votingCriterias[i]}`)

      if (!votingCriterias[i].median)
        return false;
    }

    return true;
  }
})();

export default scorecardProgressService;