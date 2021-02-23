import scorecardProgress from '../db/jsons/scorecardProgress';
import proposedCriteriaService from '../services/proposedCriteriaService';
import votingCriteriaService from '../services/votingCriteriaService';
import moment from "moment/min/moment-with-locales";
import AsyncStorage from '@react-native-community/async-storage';

const ScorecardStep = (() => {
  let locale = 'km';

  return {
    getAll,
    getAllWithSubTitle
  }

  function getAll() {
    return scorecardProgress;
  }

  function getAllWithSubTitle(scorecard, appLanguage) {
    locale = appLanguage;
    let steps = getAll();

    for(let i=0; i<steps.length; i++) {
      steps[i].subTitle = _getSubTitle(steps[i], scorecard);
    }

    return steps;
  }

  // private methods

  function _getSubTitle(step, scorecard) {
    let fn = eval(step.getSubTitle);

    if (typeof fn === "function") {
      return fn(scorecard);
    }
  }

  function getScorecardSetupSubTitle(scorecard) {
    let date = scorecard.conducted_date.split('/').reverse().join('-');

    return moment(date).locale(locale).format('LL');
  }

  function getProposedCriteriaSubTitle(scorecard) {
    return proposedCriteriaService.getAllDistinct(scorecard.uuid).length;
  }

  function getIndicatorDevelopmentSubTitle(scorecard) {
    return votingCriteriaService.getAll(scorecard.uuid).length;
  }
})();

export default ScorecardStep;
