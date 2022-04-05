import realm from '../db/schema';

const MODEL = 'ScorecardProposedIndicator';

const ScorecardProposedIndicator = (() => {
  return {
    create,
    getLastOrderByScorecard,
    deleteByScorecard,
  }

  function create(data) {
    realm.write(() => {
      realm.create(MODEL, data, 'modified');
    });
  }

  function getLastOrderByScorecard(scorecardUuid) {
    const scorecardProposedIndicator = _findByScorecard(scorecardUuid);
    return !!scorecardProposedIndicator ? scorecardProposedIndicator.order : 0;
  }

  function deleteByScorecard(scorecardUuid) {
    const scorecardProposedIndicator = _findByScorecard(scorecardUuid);
    if (!!scorecardProposedIndicator) {
      realm.write(() => {
        realm.delete(scorecardProposedIndicator);
      });
    }
  }

  // private method
  function _findByScorecard(scorecardUuid) {
    return realm.objects(MODEL).filtered(`scorecard_uuid = '${scorecardUuid}'`)[0];
  }
})();

export default ScorecardProposedIndicator;