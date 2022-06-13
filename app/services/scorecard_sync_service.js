import Moment from 'moment';
import NetInfo from '@react-native-community/netinfo';
import Scorecard from '../models/Scorecard';
import ScorecardService from './scorecardService';
import { apiDateFormat } from '../constants/date_format_constant';
import { SUBMITTED, COMPLETED } from '../constants/milestone_constant';
import settingHelper from '../helpers/setting_helper';

const scorecardSyncService = (() => {
  return {
    syncPlannedDates,
    syncScorecardsInReview,
    syncScorecard,
  }

  function syncPlannedDates(scorecardUuid) {
    const scorecard = Scorecard.find(scorecardUuid);

    if (!!scorecard.planned_start_date || scorecard.finished)
      return;

    NetInfo.fetch().then(state => {
      if (state.isConnected && state.isInternetReachable) {
        _syncAndUpdateScorecard(scorecardUuid);
      }
    });
  }

  function syncScorecardsInReview(callback) {
    const scorecards = Scorecard.getScorecardsInReview();

    scorecards.map(scorecard => {
      syncScorecard(scorecard.uuid, null, null);
    });

    !!callback && callback();
  }

  function syncScorecard(scorecardUuid, callback, errorCallback) {
    new ScorecardService().find(scorecardUuid, async (responseData) => {
      if (!!responseData) {
        const params = { endpoint_url: await settingHelper.getFullyEndpointUrl() }

        if (responseData.status === COMPLETED)
          params.milestone = SUBMITTED

        Scorecard.update(scorecardUuid, params, (newScorecard) => {
          !!callback && callback(newScorecard);
        });
        return;
      }
      !!callback && callback(Scorecard.find(scorecardUuid));
    }, (error) => {
      if (error.status == '404') {
        Scorecard.update(scorecardUuid, { endpoint_url: '' }, (newScorecard) => {
          !!callback && callback(newScorecard);
        });
      }

      !!errorCallback && errorCallback(error);
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