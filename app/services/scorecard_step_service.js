import AsyncStorage from '@react-native-community/async-storage';
import analytics from '@react-native-firebase/analytics';
import Moment from 'moment';

import { scorecardTrackingSteps } from '../constants/scorecard_step_constant';

const scorecardStepService = (() => {
  return {
    recordStep,
    recordAction,
  }

  async function recordStep(scorecardUuid, step) {
    console.log('record step == ', scorecardTrackingSteps[step].screen_name)

    await analytics().logScreenView({
      screen_name: scorecardTrackingSteps[step].screen_name,
      screen_class: scorecardTrackingSteps[step].screen_class,
    });

    recordAction(scorecardUuid, step);
  }


  async function recordAction(scorecardUuid, step) {
    let setting = await AsyncStorage.getItem('SETTING');
    setting = JSON.parse(setting);
    const currentDatetime = Moment().format('YYYY-MM-DD HH:mm:ss');

    console.log('record action =====')

    await analytics().logEvent(scorecardTrackingSteps[step].action_name, {
      scorecard_uuid: scorecardUuid,
      user: setting.email,
      finished_at: currentDatetime,
    });
  }
})();

export default scorecardStepService;