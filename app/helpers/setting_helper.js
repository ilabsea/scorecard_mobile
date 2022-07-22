import AsyncStorage from '@react-native-community/async-storage';
import Scorecard from '../models/Scorecard';
import { PROPOSED_INDICATOR_METHODS, INDICATOR_BASE, PARTICIPANT_BASE } from '../constants/scorecard_constant';
import { environment } from '../config/environment';
import EndpointUrl from '../models/EndpointUrl';
import cryptoUtil from '../utils/crypto_util';
import userService from '../services/user_service';

const keyName = 'TEMP_SETTING_DATA';

const settingHelper = (() => {
  return {
    changeable,
    getProposedIndicatorMethodStatuses,
    checkDefaultProposedIndicatorMethod,
    getProposedIndicatorMethodTracingStep,
    getFullyEndpointUrl,
    getSavedEndpointUrl,
    setTempSettingData,
    getTempSettingData,
    clearTempSettingData,
    getSettingData,
    getSavedEndpointUrlId,
    getSelectedProposedIndicatorMethodId,
    getSelectedProposedIndicatorMethodName,
    hasDiscardAlert,
    hasFullyEndpointUrl,
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
    return PROPOSED_INDICATOR_METHODS[type].firebase_step_index;
  }

  async function getFullyEndpointUrl() {
    const endpointUrl = await getSavedEndpointUrl();
    const user = userService.getSignedInUser();
    if (!user) return null;

    return `${user.email}@${endpointUrl}`;
  }

  async function getSavedEndpointUrl() {
    const savedSetting = JSON.parse(await AsyncStorage.getItem('SETTING'));
    return (!!savedSetting && !!savedSetting.backendUrl) ? savedSetting.backendUrl : environment.defaultEndpoint;
  }

  function setTempSettingData(backendUrl, email, password) {
    AsyncStorage.setItem(keyName, JSON.stringify({
      backendUrl: backendUrl,
      email: cryptoUtil.encrypt(email),
      password: cryptoUtil.encrypt(password)
    }));
  }

  async function getTempSettingData() {
    const tempData = JSON.parse(await AsyncStorage.getItem(keyName));
    if (!tempData) return null;

    tempData.email = cryptoUtil.decrypt(tempData.email);
    tempData.password = cryptoUtil.decrypt(tempData.password);
    return tempData;
  }

  function clearTempSettingData() {
    AsyncStorage.removeItem(keyName);
  }

  async function getSettingData() {
    const tempSettingData = await getTempSettingData();
    if (!!tempSettingData)
      return tempSettingData;

    const user = userService.getSignedInUser();
    const email = !!user ? user.email : null;
    const password = !!user ? user.password : null;
    return { email: email, password: password, ...JSON.parse(await AsyncStorage.getItem('SETTING')) }
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

  async function hasFullyEndpointUrl() {
    return !!await settingHelper.getFullyEndpointUrl();
  }

  // private method
  async function _getSelectedProposedIndicatorMethod() {
    const settingData = JSON.parse(await AsyncStorage.getItem('SETTING'));
    const methodType = !!settingData ? settingData.proposedIndicatorMethod : INDICATOR_BASE;
    return PROPOSED_INDICATOR_METHODS[methodType];
  }

  async function hasDiscardAlert() {
    const savedSettingData = JSON.parse(await AsyncStorage.getItem('SETTING'));
    const tempSettingData = await getTempSettingData();

    if (!savedSettingData || !tempSettingData)
      return false;

    const keys = ['backendUrl', 'email', 'password'];
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (savedSettingData[key] != tempSettingData[key])
        return true;
    }

    return false;
  }
})();

export default settingHelper;