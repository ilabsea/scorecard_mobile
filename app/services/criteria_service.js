import indicatorHelper from '../helpers/indicator_helper'
import { getIndicatorShortcutName } from '../utils/indicator_util';
import ProposedCriteria from '../models/ProposedCriteria';

class Criteria {
  constructor(scorecardUUID) {
    this.scorecardUUID = scorecardUUID;
  }

  _sort(arr) {
    return arr.sort((a, b) => b.raised_count - a.raised_count);
  }

  getCriterias = () => {
    let allCriterias = ProposedCriteria.findByScorecard(this.scorecardUUID, false);
    let criterias = JSON.parse(JSON.stringify(ProposedCriteria.findByScorecard(this.scorecardUUID, true)));

    criterias = criterias.map(criteria => {
      let indicator = indicatorHelper.getDisplayIndicator(criteria);
      criteria.raised_count = allCriterias.filter(x => x.indicatorable_id == criteria.indicatorable_id).length;
      criteria.name = indicator.name || indicator.content;
      criteria.shortcut = getIndicatorShortcutName(criteria.name);

      return criteria;
    });

    return this._sort(criterias);
  }

  hasRaisedCritria = (participants) => {
    for (let i=0; i<participants.length; i++) {
      const proposedCriteria = participants[i].proposed_criterias != undefined 
        ? participants[i].proposed_criterias
        : ProposedCriteria.find(this.scorecardUUID, participants[i].uuid);

      if (proposedCriteria.length > 0)
        return true;
    }
    return false;
  }
}

export {Criteria};
