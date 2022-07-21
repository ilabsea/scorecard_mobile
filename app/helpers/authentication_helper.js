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

    // Compare the date and time of the auth token
    return Moment(tokenExpiredDateTime).diff(currentDateTime, 'days', true) <= 0;
  }
})();

export default authenticationHelper;