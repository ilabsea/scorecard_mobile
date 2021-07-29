import { ERROR_SCORECARD_COMPLETED, ERROR_SCORECARD_EXECUTED } from '../constants/error_constant';
import Moment from 'moment';
import moment from "moment/min/moment-with-locales";
import { environment } from '../config/environment';
import { selfAssessment } from '../constants/scorecard_constant';
import { DOWNLOADED, RUNNING, FINISHED } from '../constants/milestone_constant';
import Color from '../themes/color';
import Scorecard from '../models/Scorecard';
import locationHelper from '../helpers/location_helper';

const DATE_FORMAT = 'ddd MMM DD YYYY';

const scorecardHelper = (() => {
  return {
    isScorecardAvailable,
    getScorecardErrorType,
    isExpired,
    getTranslatedRemoveDate,
    getScorecardIcon,
    scorecardTypeColor,
    getScorecardLocations,
    getGroupedByDate,
    getTranslatedDate,
    updateFinishedMilestone,
  };

  function isScorecardAvailable(scorecard) {
    return !scorecard.progress || scorecard.progress == DOWNLOADED;
  }

  function getScorecardErrorType(scorecard) {
    if (!scorecard.progress)
      return '';

    const errorTypes = {
      submitted: ERROR_SCORECARD_COMPLETED,
      default: ERROR_SCORECARD_EXECUTED
    };

    return errorTypes[scorecard.progress] || errorTypes.default;
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

  function getScorecardIcon(scorecard) {
    const milestoneIcons = {
      finished: { name: 'check', color: Color.successColor },
      submitted: { name: 'lock', color: Color.lightGrayColor },
      default: { name: 'hourglass-half', color: scorecardTypeColor(scorecard) }
    };

    return milestoneIcons[scorecard.milestone] || milestoneIcons.default;
  }

  function scorecardTypeColor(scorecard) {
    return scorecard.scorecard_type == selfAssessment ? Color.selfAssessmentColor : Color.communityScorecardColor;
  }

  function getScorecardLocations(appLanguage) {
    const provinces = Scorecard.getAllProvinces();
    let newProvinces = [];

    provinces.map(province => {
      const item = { label: province, isSelected: false };

      newProvinces.push(item);
    });

    newProvinces = newProvinces.sort((a, b) => locationHelper.getProvinceName(a.label, appLanguage) > locationHelper.getProvinceName(b.label, appLanguage))
    return newProvinces;
  }

  function updateFinishedMilestone(scorecard) {
    if (scorecard.finished && scorecard.milestone == RUNNING)
      Scorecard.update(scorecard.uuid, { milestone: FINISHED });
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