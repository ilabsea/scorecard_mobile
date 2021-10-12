import Moment from 'moment';
import NetInfo from '@react-native-community/netinfo';
import Scorecard from '../models/Scorecard';
import ScorecardService from './scorecardService';
import { apiDateFormat } from '../constants/date_format_constant';

const scorecardSyncService = (() => {
  return {
    syncPlannedDates,
  }

  function syncPlannedDates(scorecardUuid) {
    const scorecard = Scorecard.find(scorecardUuid);

    if (!!scorecard.planned_start_date || scorecard.finished)
      return;

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        _syncAndUpdateScorecard(scorecardUuid);
      }
    });
  }

  // private method
  function _syncAndUpdateScorecard(scorecardUuid) {
    new ScorecardService().find(scorecardUuid, (responseData) => {
      const params = {
        planned_start_date: Moment(responseData.planned_start_date).format(apiDateFormat),
        planned_end_date: Moment(responseData.planned_end_date).format(apiDateFormat)
      }
      Scorecard.update(scorecardUuid, params);
    }, null);
  }
})();

export default scorecardSyncService;