import { ERROR_SCORECARD_COMPLETED, ERROR_SCORECARD_EXECUTED } from '../constants/error_constant';
import Moment from 'moment';
import moment from "moment/min/moment-with-locales";
import { environment } from '../config/environment';

const DATE_FORMAT = 'ddd MMM DD YYYY';

const scorecardHelper = (() => {
  return {
    isScorecardAvailable,
    getScorecardErrorType,
    isExpired,
    getTranslatedRemoveDate,
  };

  function isScorecardAvailable(scorecard) {
    return !scorecard.progress || scorecard.progress == 'downloaded';
  }

  function getScorecardErrorType(scorecard) {
    if (!scorecard.progress)
      return '';
    else if (scorecard.progress == 'submitted')
      return ERROR_SCORECARD_COMPLETED;

    return ERROR_SCORECARD_EXECUTED;
  }

  function isExpired(uploadedDate) {
    const submittedDate = Moment(uploadedDate, DATE_FORMAT);

    return Moment().diff(submittedDate, 'days') >= environment.removeScorecardDay ? true : false;
  }

  function getTranslatedRemoveDate(uploadedDate, locale) {
    let expiredDate = Moment(uploadedDate, DATE_FORMAT).add(environment.removeScorecardDay, 'days');
    expiredDate = Moment(expiredDate).format('YYYY-MM-DD');

    return moment(expiredDate).locale(locale).format('LL');
  }
})();

export default scorecardHelper;