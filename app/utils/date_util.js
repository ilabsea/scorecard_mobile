import Moment from 'moment';
import { displayDateFormat } from '../constants/date_format_constant';

const todayDate = Moment().format(displayDateFormat);

export { todayDate };