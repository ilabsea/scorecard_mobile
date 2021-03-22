import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'moment';

const authenticationHelper = (() => {
  return {
    isTokenExpired,
  };

  async function isTokenExpired() {
    let tokenExpiredDate = await AsyncStorage.getItem('TOKEN_EXPIRED_DATE');
    tokenExpiredDate = Moment(tokenExpiredDate).format('YYYY-MM-DD');
    const currentDate = Moment().format('YYYY-MM-DD');

    return Moment(tokenExpiredDate).diff(currentDate, 'days') <= 0;
  }
})();

export default authenticationHelper;