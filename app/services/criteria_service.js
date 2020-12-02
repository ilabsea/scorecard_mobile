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

  _getVoteCount = (indicatorId) => {
    return realm.objects('ProposedCriteria').filtered(`scorecard_uuid == '${this.scorecardUUID}' AND indicatorable_id == '${indicatorId}'`).length;
  }

  _getTotalVoteCount = () => {
    return realm.objects('ProposedCriteria').filtered(`scorecard_uuid == '${this.scorecardUUID}'`).length;
  }

  getCriterias = () => {
    let indicators = this._getIndicators();
    const summaryCriteria = [{id: '', name: 'All indicator', vote_count: this._getTotalVoteCount(), shortcut: 'view-agenda', scorecard_uuid: ''}];
    let criterias = [];
    indicators.map((indicator) => {
      const attrs = {
        id: indicator.id,
        uuid: indicator.uuid,
        name: indicator.name.split(':').pop(),
        vote_count: this._getVoteCount(indicator.id || indicator.uuid),
        shortcut: indicator.name.split(':')[0],
        scorecard_uuid: indicator.scorecard_uuid,
      };
      criterias.push(attrs);
    });
    criterias.sort((a, b) => (a.vote_count < b.vote_count));
    return [...summaryCriteria, ...criterias];
  }

  getParticipantProposedCriteria = (participantUUID) => {
    return realm.objects('ProposedCriteria').filtered(`scorecard_uuid = '${this.scorecardUUID}' AND participant_uuid = '${participantUUID}'`);
  }
}

export {Criteria};