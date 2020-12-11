import ParticipantSchema from '../db/models/participant';
import realm from '../db/schema';
import {getIndicatorName, getIndicatorShortcutName} from './indicator_service';
class Criteria {
  constructor(scorecardUUID) {
    this.scorecardUUID = scorecardUUID;
  }

  _getIndicators = () => {
    let predefinedIndicators = realm.objects('Indicator').filtered(`scorecard_uuid == '${this.scorecardUUID}'`);
    const customIndicators = realm.objects('CustomIndicator').filtered(`scorecard_uuid == '${this.scorecardUUID}'`);
    return [...predefinedIndicators, ...customIndicators];
  }

  _getRaisedCount = (indicatorId) => {
    return realm.objects('ProposedCriteria').filtered(`scorecard_uuid == '${this.scorecardUUID}' AND indicatorable_id == '${indicatorId}'`).length;
  }

  _getTotalRaisedCount = () => {
    return realm.objects('ProposedCriteria').filtered(`scorecard_uuid == '${this.scorecardUUID}'`).length;
  }

  getCriterias = () => {
    let indicators = this._getIndicators();
    const summaryCriteria = [{id: '', name: 'All indicator', raised_count: this._getTotalRaisedCount(), shortcut: 'view-agenda', scorecard_uuid: ''}];
    let criterias = [];
    indicators.map((indicator) => {
      const raisedCount = this._getRaisedCount(indicator.id || indicator.uuid);
      if (raisedCount > 0) {
        const attrs = {
          id: indicator.id,
          uuid: indicator.uuid,
          name: getIndicatorName(indicator.name),
          raised_count: raisedCount,
          shortcut: getIndicatorShortcutName(indicator.name),
          scorecard_uuid: indicator.scorecard_uuid,
        };
        criterias.push(attrs);
      }
    });
    criterias.sort((a, b) => (a.raised_count < b.raised_count));
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