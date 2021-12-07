import Moment from 'moment';

const getTimeFromDuration = (duration) => {
  let date = new Date(null);
  date.setSeconds(duration);
  return date.toISOString().substr(11, 8);
}

const currentTime = () => {
  return Moment().format('HH:mm:ss ZZ');
}

export { getTimeFromDuration, currentTime };