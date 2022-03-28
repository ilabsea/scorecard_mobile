import AsyncStorage from '@react-native-community/async-storage';
import Scorecard from '../models/Scorecard';
import { INDICATOR_BASE, PARTICIPANT_BASE } from '../constants/main_constant';

const settingHelper = (() => {
  return {
    changeable,
    getProposedIndicatorMethodStatuses,
    getProposedIndicatorMethodByIndex,
  };

  async function changeable(newEndpoint) {
    const setting = await AsyncStorage.getItem('SETTING');
    const previousEndpoint = setting != null ? JSON.parse(setting).backendUrl : ''

    if (newEndpoint != previousEndpoint  && Scorecard.hasUnsubmitted())
      return false;

    return true;
  }

  function getProposedIndicatorMethodStatuses(savedSetting) {
    const proposedMethodsAccorionStatuses = {
      'indicatorBase': [true, false],
      'participantBase': [false, true],
      'default': [true, false]
    }

    if (!!savedSetting)
      return proposedMethodsAccorionStatuses[savedSetting.proposedIndicatorMethod.toString()];

    return proposedMethodsAccorionStatuses.default;
  }

  function getProposedIndicatorMethodByIndex(index) {
    return index === 0 ? INDICATOR_BASE : PARTICIPANT_BASE
  }
})();

export default settingHelper;