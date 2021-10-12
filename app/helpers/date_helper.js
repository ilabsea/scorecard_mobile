import Moment from 'moment';
import { environment } from '../config/environment';

const dateHelper = (() => {
  return {
    getMinimumSelectDate,
    getMaximumSelectDate,
  }

  function getMinimumSelectDate() {
    return Moment().subtract(environment.implementedDayRange, "days").toDate();
  }

  function getMaximumSelectDate() {
    return Moment().add(environment.implementedDayRange, "days").toDate();
  }
})();

export default dateHelper;