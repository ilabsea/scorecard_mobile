import realm from '../db/schema';

import indicatorHelper from '../helpers/indicator_helper'
import { getIndicatorShortcutName } from '../utils/indicator_util';

class Criteria {
  constructor(scorecardUUID) {
    this.scorecardUUID = scorecardUUID;
  }

  _getRaisedCount = (indicatorId) => {
    return realm.objects('ProposedCriteria').filtered(`scorecard_uuid == '${this.scorecardUUID}' AND indicatorable_id == '${indicatorId}'`).length;
  }

  _getTotalRaisedCount = () => {
    return realm.objects('ProposedCriteria').filtered(`scorecard_uuid == '${this.scorecardUUID}' DISTINCT(participant_uuid)`).length;
  }

  _sort(arr) {
    return arr.sort((a, b) => b.raised_count - a.raised_count);
  }

  getCriterias = () => {
    let allCriterias = realm.objects('ProposedCriteria').filtered(`scorecard_uuid='${this.scorecardUUID}'`);
    let criterias = JSON.parse(JSON.stringify(realm.objects('ProposedCriteria').filtered(`scorecard_uuid='${this.scorecardUUID}' DISTINCT(tag)`)));
    const summaryCriteria = [{id: '', name: 'All indicator', raised_count: this._getTotalRaisedCount(), shortcut: 'view-agenda', scorecard_uuid: ''}];

    criterias = criterias.map(criteria => {
      let indicator = indicatorHelper.getDisplayIndicator(criteria);
      criteria.raised_count = allCriterias.filter(x => x.tag == criteria.tag).length;
      criteria.name = indicator.name || indicator.content;
      criteria.shortcut = getIndicatorShortcutName(criteria.name);

      return criteria;
    });

    criterias = this._sort(criterias);

    return [...summaryCriteria, ...criterias];
  }

  getParticipantProposedCriteria = (participantUUID) => {
    return realm.objects('ProposedCriteria').filtered(`scorecard_uuid = '${this.scorecardUUID}' AND participant_uuid = '${participantUUID}'`);
  }

  hasRaisedCritria = (participants) => {
    for (let i=0; i<participants.length; i++) {
      const proposedCriteria = participants[i].proposed_criterias != undefined ? participants[i].proposed_criterias : this.getParticipantProposedCriteria(participants[i].uuid);
      if (proposedCriteria.length > 0)
        return true;
    }
    return false;
  }
}

export {Criteria};
