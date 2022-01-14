import Moment from 'moment';

const getTimeFromDuration = (duration) => {
  let date = new Date(null);
  date.setSeconds(duration);
  return date.toISOString().substr(11, 8);
}

const getTimeFromMiliseconds = (miliseconds) => {
  return Moment(miliseconds).format('LTS');
}

export { getTimeFromDuration, getTimeFromMiliseconds };