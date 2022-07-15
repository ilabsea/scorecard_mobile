import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'moment';

const authenticationHelper = (() => {
  return {
    isTokenExpired,
  };

  async function isTokenExpired() {
    let tokenExpiredDateTime = await AsyncStorage.getItem('TOKEN_EXPIRED_DATE');
    if (!tokenExpiredDateTime)
      return true;

    tokenExpiredDateTime = Moment(tokenExpiredDateTime).format('YYYY-MM-DD HH:mm:ss');
    const currentDateTime = Moment().format('YYYY-MM-DD HH:mm:ss');

    console.log('curent date time = ', currentDateTime);
    console.log('token expired date time = ', tokenExpiredDateTime)

    return Moment(tokenExpiredDateTime).diff(currentDateTime, 'days', true) <= 0;

    // tokenExpiredDate = Moment(tokenExpiredDate).format('YYYY-MM-DD');
    // const currentDate = Moment().format('YYYY-MM-DD');

    // return Moment(tokenExpiredDate).diff(currentDate, 'days') <= 0;
  }
})();

export default authenticationHelper;