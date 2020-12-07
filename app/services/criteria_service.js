import realm from '../db/schema';
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
          name: indicator.name.split(':').pop(),
          raised_count: raisedCount,
          shortcut: indicator.name.split(':')[0],
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
}

export {Criteria};