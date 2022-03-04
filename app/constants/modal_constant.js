import { getDeviceStyle, isShortScreenDevice } from '../utils/responsive_util';

export const PROPOSED_INDICATOR = 'PROPOSED_INDICATOR';
export const INDICATOR_DEVELOPMENT = 'INDICATOR_DEVELOPMENT';
export const VOTING_INDICATOR = 'VOTING_INDICATOR';
export const SCORECARD_RESULT = 'SCORECARD_RESULT';

export const tipModalSnapPoints = {
  'PROPOSED_INDICATOR': getDeviceStyle('78%', '76%'),
  'INDICATOR_DEVELOPMENT': getDeviceStyle('35.5%', '43%'),
  'VOTING_INDICATOR': getDeviceStyle(['36%'], ['40%']),
  'SCORECARD_RESULT': getDeviceStyle(['36%'], ['47%']),
};

export const participantContentHeight = getDeviceStyle('68%', isShortScreenDevice() ? '82%' : '72.5%');