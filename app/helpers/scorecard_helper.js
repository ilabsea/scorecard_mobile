import { ERROR_SCORECARD_COMPLETED, ERROR_SCORECARD_EXECUTED } from '../constants/error_constant';
import Moment from 'moment';
import moment from "moment/min/moment-with-locales";
import { environment } from '../config/environment';
import { scorecardStatuses, selfAssessment } from '../constants/scorecard_constant';
import Color from '../themes/color';
import Scorecard from '../models/Scorecard';

const DATE_FORMAT = 'ddd MMM DD YYYY';

const scorecardHelper = (() => {
  return {
    isScorecardAvailable,
    getScorecardErrorType,
    isExpired,
    getTranslatedRemoveDate,
    getStatusIcon,
    iconColor,
    scorecardTypeColor,
    getScorecardLocations,
    getGroupedByDate,
    getTranslatedDate
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

  function getStatusIcon(scorecard) {
    if (scorecard.isUploaded)
      return 'lock';
    else if (scorecard.finished)
      return 'check';

    return 'hourglass-half';
  }

  function iconColor(scorecard) {
    if (scorecard.isUploaded)
      return Color.lightGrayColor;
    else if (scorecard.finished)
      return Color.successColor;

    return scorecardTypeColor(scorecard);
  }

  function scorecardTypeColor(scorecard) {
    if (scorecard.scorecard_type == selfAssessment)
      return Color.selfAssessmentColor;

    return Color.communityScorecardColor;
  }

  function getScorecardLocations() {
    const provinces = Scorecard.getAllProvinces();
    let newProvinces = [];

    provinces.map(province => {
      const item = { label: province, isSelected: false };

      newProvinces.push(item);
    });

    newProvinces = newProvinces.sort((a, b) => a.label > b.label)

    return newProvinces;
  }

  // Group the scorecard by month and year
  function getGroupedByDate(scorecards) {
    let newScorecards = {};
    scorecards.map(scorecard => {
      const date = Moment(scorecard.conducted_date, 'DD/MM/YYYY').format('MMM YYYY');

      if (!newScorecards[date])
        newScorecards[date] = [];

      newScorecards[date].push(scorecard);
    });

    let groupedScorecards = Object.keys(newScorecards).map(date => {
      const conductedDate = newScorecards[date][0].conducted_date;

      return {
        date: Moment(conductedDate.toString(), 'DD/MM/YYYY').format('DD/MM/YYYY'),
        scorecards: _sortByDate(newScorecards[date], 'conducted_date')
      }
    })

    return _sortByDate(groupedScorecards, 'date')
  }

  function getTranslatedDate(date, locale, format) {
    const translatedDate = Moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');

    return moment(translatedDate).locale(locale).format(format);
  }

  //private method
  function _sortByDate(items, fieldName) {
    return items.sort((a, b) => {
      const newDateA = Moment(a[fieldName], 'DD/MM/YYYY');
      const newDateB = Moment(b[fieldName], 'DD/MM/YYYY');

      return Moment(newDateA).isAfter(newDateB) ? -1 : 1;
    });
  }
})();

export default scorecardHelper;