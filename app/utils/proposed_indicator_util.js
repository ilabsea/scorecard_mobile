import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info'
import { INDICATOR_BASE } from '../constants/main_constant';
import { instructionVideoIds } from '../constants/proposed_indicator_constant';

export const getProposedIndicatorMethod = async () => {
  const setting = JSON.parse(await AsyncStorage.getItem('SETTING'));
  return !!setting ? setting.proposedIndicatorMethod : INDICATOR_BASE;
}

export const isProposeByIndicatorBase = async () => {
  return await getProposedIndicatorMethod() === INDICATOR_BASE;
}

export const getProposedIndicatorVideoId = (proposeMethod) => {
  const deviceType = DeviceInfo.isTablet() ? 'tablet' : 'mobile';
  return instructionVideoIds[deviceType][proposeMethod];
}