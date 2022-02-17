import scorecardProgress from '../db/jsons/scorecardProgress';
import VotingCriteria from './VotingCriteria';
import moment from "moment/min/moment-with-locales";
import AsyncStorage from '@react-native-community/async-storage';
import Participant from './Participant';
import ProposedIndicator from './ProposedIndicator';

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
    return Participant.findByScorecard(scorecard.uuid).length;
  }

  getProposedCriteriaSubTitle(scorecard) {
    return ProposedIndicator.getAllDistinct(scorecard.uuid).length;
  }

  getIndicatorDevelopmentSubTitle(scorecard) {
    return VotingCriteria.getAll(scorecard.uuid).length;
  }
}

export default ScorecardStep;