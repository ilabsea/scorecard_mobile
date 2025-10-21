import AsyncStorage from '@react-native-async-storage/async-storage';
import Scorecard from '../models/Scorecard';
import { getUniqueScorecards } from '../utils/scorecard_util';
import { SELECTED_FILTERS } from '../constants/main_constant';

const SCORECARD_TYPE = 'scorecard-type';
const PROVINCE = 'province';

const scorecardFilterService = (() => {
  return {
    getFilteredScorecards,
    saveSelectedFilter,
  }

  async function getFilteredScorecards() {
    let selectedFilters = await AsyncStorage.getItem(SELECTED_FILTERS);
    let scorecards = Scorecard.getAll();

    if (!selectedFilters)
      return scorecards;

    selectedFilters = JSON.parse(selectedFilters)
    const { statuses, types, provinces } = selectedFilters;
    let filteredScorecards = [];

    filteredScorecards = await [...filteredScorecards, ..._getScorecardByStatuses(scorecards, statuses)];
    filteredScorecards = await _getScorecards(filteredScorecards, SCORECARD_TYPE, types);        // Filter scorecard by scorecard type
    filteredScorecards = await _getScorecards(filteredScorecards, PROVINCE, provinces);          // Filter scorecard by scorecard location

    return getUniqueScorecards(filteredScorecards);
  }

  function saveSelectedFilter(selectedStatuses, selectedTypes, selectedProvinces) {
    const selectedFilters = {
      statuses: selectedStatuses,
      types: selectedTypes,
      provinces: selectedProvinces,
    };

    if (!!selectedStatuses.length || !!selectedTypes.length || !!selectedProvinces.length) {
      AsyncStorage.setItem(SELECTED_FILTERS, JSON.stringify(selectedFilters));
      return;
    }

    AsyncStorage.removeItem(SELECTED_FILTERS);
  }

  // private method
  function _getScorecardByStatuses(scorecards, statuses) {
    if (!statuses.length)
      return scorecards;

    let filteredScorecards = [];
    const scorecardStatus = {
      'finished': scorecards.filter(scorecard => (scorecard.finished && !scorecard.isUploaded)),
      'submitted': scorecards.filter(scorecard => scorecard.isUploaded),
      'default': scorecards.filter(scorecard => (!scorecard.isUploaded && !scorecard.finished)),
    };

    statuses.map(status => {
      const results = scorecardStatus[status] || scorecardStatus['default'];

      filteredScorecards = [...filteredScorecards, ...results]
    });

    return filteredScorecards;
  }

  function _getScorecards(scorecards, type, filterItems) {
    if (!filterItems.length)
      return scorecards;

    let filteredScorecards = [];

    filterItems.map(item => {
      const results = scorecards.filter(scorecard =>  type == SCORECARD_TYPE ? scorecard.scorecard_type == item : scorecard.province == item);

      filteredScorecards = [...filteredScorecards, ...results]
    });

    return filteredScorecards;
  }
})();

export default scorecardFilterService;