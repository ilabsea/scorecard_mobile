import Moment from 'moment';
import { todayDate } from '../utils/date_util';
import { displayDateFormat } from '../constants/date_format_constant';
import { environment } from '../config/environment';

const dateHelper = (() => {
  return {
    isBeforeCurrentDate,
    getMinimumSelectedDate,
  }

  function isBeforeCurrentDate(selectedDate) {
    const today = Moment(todayDate, displayDateFormat);
    const date = Moment(selectedDate, displayDateFormat);

    return Moment(date).isBefore(today);
  }

  function getMinimumSelectedDate() {
    return Moment().subtract(environment.minimumImplementedDays, "days").toDate();
  }
})();

export default dateHelper;