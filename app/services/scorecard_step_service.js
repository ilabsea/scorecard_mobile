import AsyncStorage from '@react-native-community/async-storage';
import analytics from '@react-native-firebase/analytics';

import Moment from 'moment';

const scorecardStepService = (() => {
  return {
    recordFinishDatetime,
  }

  async function recordFinishDatetime(scorecardUuid, step) {
    let setting = await AsyncStorage.getItem('SETTING');
    setting = JSON.parse(setting);
    const currentDatetime = Moment().format('YYYY-MM-DD HH:mm:ss');

    await analytics().logEvent('scorecard_step', {
      scorecard_uuid: scorecardUuid,
      step: step,
      user: setting.email,
      finished_at: currentDatetime,
    });
  }
})();

export default scorecardStepService;