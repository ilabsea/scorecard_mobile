import DeviceInfo from 'react-native-device-info'
import { INDICATOR_BASE } from '../constants/scorecard_constant';
import { instructionVideoIds } from '../constants/proposed_indicator_constant';
import settingHelper from '../helpers/setting_helper';

export const isProposeByIndicatorBase = async () => {
  return await settingHelper.getSelectedProposedIndicatorMethodName() === INDICATOR_BASE;
}

export const getProposedIndicatorVideoId = (proposeMethod) => {
  const deviceType = DeviceInfo.isTablet() ? 'tablet' : 'mobile';
  return instructionVideoIds[deviceType][proposeMethod];
}