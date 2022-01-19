import Moment from 'moment';
import { displayDateFormat } from '../constants/date_format_constant';

const todayDate = () => { return Moment().format(displayDateFormat) };

const currentDateTime = () => { return Moment().toDate() };

export { todayDate, currentDateTime };