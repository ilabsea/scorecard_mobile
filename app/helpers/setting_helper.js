import AsyncStorage from '@react-native-community/async-storage';
import Scorecard from '../models/Scorecard';

const settingHelper = (() => {
  return {
    changeable
  };

  async function changeable(newEndpoint) {
    const setting = await AsyncStorage.getItem('SETTING');
    const previousEndpoint = setting != null ? JSON.parse(setting).backendUrl : ''

    if (newEndpoint != previousEndpoint  && Scorecard.hasUnsubmitted())
      return false;

    return true;
  }
})();

export default settingHelper;