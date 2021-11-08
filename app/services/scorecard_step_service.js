import AsyncStorage from '@react-native-community/async-storage';
import analytics from '@react-native-firebase/analytics';

import Moment from 'moment';

const scorecardStepService = (() => {
  return {
    recordFinishDatetime,
  }

  async function recordFinishDatetime(scorecardUuid, screenName) {
    // let setting = await AsyncStorage.getItem('SETTING');
    // setting = JSON.parse(setting);
    // const currentDatetime = Moment().format('YYYY-MM-DD HH:mm:ss');

    // console.log('screen name = ', screenName);
    // console.log('date time = ', currentDatetime);

    analytics().logEvent('scorecard_step', {
      scorecard_uuid: scorecardUuid,
      screen_name: screenName,
      // user: setting.email,
      // finished_at: currentDatetime,
    });

    // await analytics().logScreenView({
    //   screen_name: screenName,
    //   screen_class: screenName
    // })
  }
})();

export default scorecardStepService;