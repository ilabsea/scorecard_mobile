import AsyncStorage from '@react-native-community/async-storage';
import analytics from '@react-native-firebase/analytics';

import { scorecardTrackingSteps } from '../constants/scorecard_step_constant';

const scorecardTracingStepsService = (() => {
  return {
    trace,
  }

  async function trace(scorecardUuid, step) {
    let setting = await AsyncStorage.getItem('SETTING');
    setting = JSON.parse(setting);

    await analytics().logEvent(scorecardTrackingSteps[step], {
      scorecard_uuid: scorecardUuid,
      user: setting.email,
    });
  }
})();

export default scorecardTracingStepsService;