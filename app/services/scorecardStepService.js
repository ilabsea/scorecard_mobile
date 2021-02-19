import scorecardProgress from '../db/jsons/scorecardProgress';
import proposedCriteriaService from './proposedCriteriaService';
import votingCriteriaService from './votingCriteriaService';
import moment from "moment/min/moment-with-locales";

const scorecardStepService = (() => {
  var locale = 'km';
  var translations = {};

  return {
    getAll,
    getAllWithSubTitle
  }

  function getAll() {
    return scorecardProgress;
  }

  function getAllWithSubTitle(scorecard, translationsObj, appLanguage) {
    locale = appLanguage;
    translations = translationsObj;

    let steps = getAll();
    for(let i=0; i<steps.length; i++) {
      steps[i].subTitle = _getSubTitle(steps[i].value, scorecard);
    }

    return steps;
  }

  function _getSubTitle(stepValue, scorecard) {
    switch (stepValue) {
      case 1:
        return _getScorecardSetupSubTitle(scorecard);
      case 2:
        return _getProposedCriteriaSubTitle(scorecard);
      case 3:
        return _getIndicatorDevelopmentSubTitle(scorecard);
      default:
        return '';
    }
  }

  function _getScorecardSetupSubTitle(scorecard) {
    let date = scorecard.conducted_date.split('/').reverse().join('-');

    return `${translations.conductedDate}: ${moment(date).locale(locale).format('LL')}`;
  }

  function _getProposedCriteriaSubTitle(scorecard) {
    let criteriaSize = proposedCriteriaService.getAllDistinct(scorecard.uuid).length;

    return `${translations.numberOfCriteria}: ${criteriaSize}`;
  }

  function _getIndicatorDevelopmentSubTitle(scorecard) {
    let criteriaSize = votingCriteriaService.getAll(scorecard.uuid).length;

    return `${translations.numberOfCriteria}: ${criteriaSize}`;
  }
})();

export default scorecardStepService;
