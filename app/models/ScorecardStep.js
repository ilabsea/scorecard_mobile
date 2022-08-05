import scorecardProgress from '../db/jsons/scorecardProgress';
import VotingIndicator from './VotingIndicator';
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
    return Participant.getAllCountable(scorecard.uuid).length;
  }

  getProposedIndicatorSubTitle(scorecard) {
    return ProposedIndicator.getAllDistinct(scorecard.uuid).length;
  }

  getIndicatorDevelopmentSubTitle(scorecard) {
    return VotingIndicator.getAll(scorecard.uuid).length;
  }
}

export default ScorecardStep;