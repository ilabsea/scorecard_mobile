import AsyncStorage from '@react-native-community/async-storage';
import Scorecard from '../models/Scorecard';
import { INDICATOR_BASE, PARTICIPANT_BASE } from '../constants/main_constant';
import { INDICATOR_BASE_STEP, PARTICIPANT_BASE_STEP } from '../constants/scorecard_step_constant';
import { INDICATOR_BASED_ENUM, PARTICIPANT_BASED_ENUM } from '../constants/scorecard_constant';
import { environment } from '../config/environment';
import EndpointUrl from '../models/EndpointUrl';

const keyName = 'TEMP_SETTING_DATA';

const settingHelper = (() => {
  return {
    changeable,
    getProposedIndicatorMethodStatuses,
    getProposedIndicatorMethodByIndex,
    checkDefaultProposedIndicatorMethod,
    getProposedIndicatorMethodTracingStep,
    getEndpointPickerHeight,
    getFullyEndpointUrl,
    getSavedEndpointUrl,
    saveTempSettingData,
    getTempSettingData,
    clearTempSettingData,
    getSettingData,
    getSavedEndpointUrlId,
    getProposeIndicatorMethodForScorecard,
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
      'snap_points': ['75%'],
      'content': '73%'
    }
    return heights[type];
  }

  async function getFullyEndpointUrl() {
    const savedSetting = JSON.parse(await AsyncStorage.getItem('SETTING'));
    if (!savedSetting || !savedSetting.email)
      return '';

    return `${savedSetting.email}@${savedSetting.backendUrl}`;
  }

  async function getSavedEndpointUrl() {
    const savedSetting = JSON.parse(await AsyncStorage.getItem('SETTING'));
    return (!!savedSetting && !!savedSetting.backendUrl) ? savedSetting.backendUrl : environment.defaultEndpoint;
  }

  function saveTempSettingData(endpoint, email, password) {
    AsyncStorage.setItem(keyName, JSON.stringify({ endpoint, email, password }));
  }

  async function getTempSettingData() {
    return JSON.parse(await AsyncStorage.getItem(keyName));
  }

  function clearTempSettingData() {
    AsyncStorage.removeItem(keyName);
  }

  async function getSettingData() {
    const tempSettingData = await getTempSettingData();
    return !!tempSettingData ? tempSettingData : JSON.parse(await AsyncStorage.getItem('SETTING'));
  }

  async function getSavedEndpointUrlId() {
    const savedEndpointUrl = await getSavedEndpointUrl();
    const endpointUrl = EndpointUrl.findByUrlValue(savedEndpointUrl);
    return !!endpointUrl ? endpointUrl.id : null;
  }

  async function getProposeIndicatorMethodForScorecard() {
    const settingData = await getSettingData();
    return settingData.proposedIndicatorMethod == INDICATOR_BASE ? INDICATOR_BASED_ENUM : PARTICIPANT_BASED_ENUM;
  }
})();

export default settingHelper;