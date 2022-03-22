import AsyncStorage from '@react-native-community/async-storage';
import { INDICATOR_BASE } from '../constants/main_constant';

export const getProposedIndicatorMethod = async () => {
  const setting = JSON.parse(await AsyncStorage.getItem('SETTING'));
  return !!setting ? setting.proposedIndicatorMethod : INDICATOR_BASE;
}

export const isProposeByIndicatorBase = async () => {
  return await getProposedIndicatorMethod() === INDICATOR_BASE;
}
