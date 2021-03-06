import scorecardProgress from '../db/jsons/scorecardProgress';
import proposedCriteriaService from '../services/proposedCriteriaService';
import votingCriteriaService from '../services/votingCriteriaService';
import moment from "moment/min/moment-with-locales";
import AsyncStorage from '@react-native-community/async-storage';

class ScorecardStep {
  constructor() {
    this.locale = 'km';
  }

  getAll() {
    return scorecardProgress;
  }

  getAllWithSubTitle(scorecard, appLanguage) {
    this.locale = appLanguage;
    let steps = this.getAll();

    for(let i=0; i<steps.length; i++) {
      steps[i].subTitle = this._getSubTitle(steps[i], scorecard);
    }

    return steps;
  }

  // private methods

  _getSubTitle(step, scorecard) {
    if (step.getSubTitle != '') {
      return this[step.getSubTitle](scorecard);
    }

    return '';
  }

  getScorecardSetupSubTitle(scorecard) {
    if (scorecard.conducted_date == null)
      return '';

    let date = scorecard.conducted_date.split('/').reverse().join('-');

    return moment(date).locale(this.locale).format('LL');
  }

  getProposedCriteriaSubTitle(scorecard) {
    return proposedCriteriaService.getAllDistinct(scorecard.uuid).length;
  }

  getIndicatorDevelopmentSubTitle(scorecard) {
    return votingCriteriaService.getAll(scorecard.uuid).length;
  }
}

export default ScorecardStep;