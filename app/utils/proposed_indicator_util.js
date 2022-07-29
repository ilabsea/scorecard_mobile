import { INDICATOR_BASE } from '../constants/scorecard_constant';
import { instructionVideoIds } from '../constants/proposed_indicator_constant';
import settingHelper from '../helpers/setting_helper';
import deviceUtil from './device_util';

export const isProposeByIndicatorBase = async () => {
  return await settingHelper.getSelectedProposedIndicatorMethodName() === INDICATOR_BASE;
}

export const getProposedIndicatorVideoId = (proposeMethod) => {
  return instructionVideoIds[deviceUtil.getDeviceType()][proposeMethod];
}