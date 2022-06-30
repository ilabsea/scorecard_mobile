import AsyncStorage from '@react-native-community/async-storage';
import Scorecard from '../models/Scorecard';
import { PROPOSED_INDICATOR_METHODS, INDICATOR_BASE, PARTICIPANT_BASE } from '../constants/scorecard_constant';
import { environment } from '../config/environment';
import EndpointUrl from '../models/EndpointUrl';

const keyName = 'TEMP_SETTING_DATA';

const settingHelper = (() => {
  return {
    changeable,
    getProposedIndicatorMethodStatuses,
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
    getSelectedProposedIndicatorMethodId,
    getSelectedProposedIndicatorMethodName,
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

  async function checkDefaultProposedIndicatorMethod() {
    let savedSetting = JSON.parse(await AsyncStorage.getItem('SETTING'));

    if (!!savedSetting && !savedSetting.proposedIndicatorMethod)
      savedSetting.proposedIndicatorMethod = PARTICIPANT_BASE;
    else if (!savedSetting)
      savedSetting = { proposedIndicatorMethod: INDICATOR_BASE };

    AsyncStorage.setItem('SETTING', JSON.stringify(savedSetting));
  }

  function getProposedIndicatorMethodTracingStep(type) {
    return PROPOSED_INDICATOR_METHODS[type].step;
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

  async function getSelectedProposedIndicatorMethodId() {
    const selectedProposedMethod = await _getSelectedProposedIndicatorMethod();
    return selectedProposedMethod.id;
  }

  async function getSelectedProposedIndicatorMethodName() {
    const selectedProposedMethod = await _getSelectedProposedIndicatorMethod();
    return selectedProposedMethod.name;
  }

  // private method
  async function _getSelectedProposedIndicatorMethod() {
    const settingData = JSON.parse(await AsyncStorage.getItem('SETTING'));
    const methodType = !!settingData ? settingData.proposedIndicatorMethod : INDICATOR_BASE;
    return PROPOSED_INDICATOR_METHODS[methodType];
  }
})();

export default settingHelper;