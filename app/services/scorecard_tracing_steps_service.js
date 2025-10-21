import AsyncStorage from '@react-native-async-storage/async-storage';
import analytics from '@react-native-firebase/analytics';

import { scorecardTrackingSteps } from '../constants/scorecard_constant';

const scorecardTracingStepsService = (() => {
  return {
    trace,
  }

  async function trace(scorecardUuid, step, email = null) {
    let setting = await AsyncStorage.getItem('SETTING');
    setting = JSON.parse(setting);
    const loggedInEmail = setting.email || email;

    await analytics().logEvent(scorecardTrackingSteps[step], {
      scorecard_uuid: scorecardUuid,
      user: loggedInEmail || null,
    });
  }
})();

export default scorecardTracingStepsService;