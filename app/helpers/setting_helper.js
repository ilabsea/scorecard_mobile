import AsyncStorage from '@react-native-community/async-storage';
import Scorecard from '../models/Scorecard';
import { INDICATOR_BASE, PARTICIPANT_BASE } from '../constants/main_constant';
import { INDICATOR_BASE_STEP, PARTICIPANT_BASE_STEP } from '../constants/scorecard_step_constant';

const settingHelper = (() => {
  return {
    changeable,
    getProposedIndicatorMethodStatuses,
    getProposedIndicatorMethodByIndex,
    checkDefaultProposedIndicatorMethod,
    getProposedIndicatorMethodTracingStep,
    getEndpointPickerHeight,
    getCurrentSignInData,
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

  async function checkDefaultProposedIndicatorMethod() {
    let savedSetting = JSON.parse(await AsyncStorage.getItem('SETTING'));

    if (!!savedSetting && !savedSetting.proposedIndicatorMethod)
      savedSetting.proposedIndicatorMethod = PARTICIPANT_BASE;
    else if (!savedSetting)
      savedSetting = { proposedIndicatorMethod: INDICATOR_BASE };

    AsyncStorage.setItem('SETTING', JSON.stringify(savedSetting));
  }

  function getProposedIndicatorMethodTracingStep(index) {
    return getProposedIndicatorMethodByIndex(index) === INDICATOR_BASE ? INDICATOR_BASE_STEP : PARTICIPANT_BASE_STEP;
  }

  function getEndpointPickerHeight(type, endpointUrls) {
    const heights = {
      // 'snap_points': endpointUrls.length > 3 ? ['60%'] : ['40%'],
      // 'content': endpointUrls.length > 3 ? '58%' : '38%]'
      'snap_points': ['75%'],
      'content': '73%'
    }
    return heights[type];
  }

  async function getCurrentSignInData() {
    const savedSetting = JSON.parse(await AsyncStorage.getItem('SETTING'));
    return { user_email: savedSetting.email, endpoint: savedSetting.backendUrl }
  }
})();

export default settingHelper;