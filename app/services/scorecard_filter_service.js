import Scorecard from '../models/Scorecard';
import { getUniqueScorecards } from '../utils/scorecard_util';

const SCORECARD_TYPE = 'scorecard-type';
const PROVINCE = 'province';

const scorecardFilterService = (() => {
  return {
    getFilteredScorecards
  }

  async function getFilteredScorecards(options) {
    const { statuses, types, provinces } = options;
    let filteredScorecards = [];
    let scorecards = Scorecard.getAll();

    if (!!statuses.length)
      filteredScorecards = await [...filteredScorecards, ..._getScorecardByStatuses(scorecards, statuses)];
    if (!!types.length) {
      scorecards = !!filteredScorecards.length ? filteredScorecards : scorecards
      filteredScorecards = await _getScorecards(scorecards, SCORECARD_TYPE, types);
    }
    if (!!provinces.length) {
      scorecards = !!filteredScorecards.length ? filteredScorecards : scorecards
      filteredScorecards = await _getScorecards(scorecards, PROVINCE, provinces);
    }

    return getUniqueScorecards(filteredScorecards);
  }

  // private method
  function _getScorecardByStatuses(scorecards, statuses) {
    let filteredScorecards = [];

    statuses.map(status => {
      let results = null;

      if (status == 'finished')
        results = scorecards.filter(scorecard => (scorecard.finished && !scorecard.isUploaded));
      else if (status == 'submitted')
        results = scorecards.filter(scorecard => scorecard.isUploaded);
      else
        results = scorecards.filter(scorecard => (!scorecard.isUploaded && !scorecard.finished));

      filteredScorecards = [...filteredScorecards, ...results]
    });

    return filteredScorecards;
  }

  function _getScorecards(scorecards, type, filterItems) {
    let filteredScorecards = [];

    filterItems.map(item => {
      const results = scorecards.filter(scorecard => {
        if (type == SCORECARD_TYPE)
          return scorecard.scorecard_type == item;

        return scorecard.province == item;
      });

      filteredScorecards = [...filteredScorecards, ...results]
    });

    return filteredScorecards;
  }
})();

export default scorecardFilterService;