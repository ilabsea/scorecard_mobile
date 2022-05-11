import { getDeviceStyle, isShortScreenDevice, isShortWidthScreen } from '../utils/responsive_util';

export const PROPOSED_INDICATOR = 'PROPOSED_INDICATOR';
export const INDICATOR_DEVELOPMENT = 'INDICATOR_DEVELOPMENT';
export const VOTING_INDICATOR = 'VOTING_INDICATOR';
export const SCORECARD_RESULT = 'SCORECARD_RESULT';

export const tipModalSnapPoints = {
  'PROPOSED_INDICATOR': ['54%', getDeviceStyle('78%', isShortScreenDevice() ? '81%' : '76%')],
  'INDICATOR_DEVELOPMENT': [getDeviceStyle('35.5%', '43%')],
  'VOTING_INDICATOR': [getDeviceStyle('36%', isShortScreenDevice() ? '43%' : '40%')],
  'SCORECARD_RESULT': [getDeviceStyle('36%', isShortScreenDevice() ? '42%' : '47%')],
};

export const participantModalSnapPoints = getDeviceStyle(['70%'], isShortScreenDevice() ? ['85%'] : ['75%']);
export const participantContentHeight = getDeviceStyle('68%', isShortScreenDevice() ? '82%' : '72.5%');

export const participantListModalSnapPoints = ['100%'];
export const participantListContentHeight = '94%';

export const indicatorDevelopmentModalSnapPoints = getDeviceStyle(['77%'], isShortScreenDevice() ? ['89.5%']  : ['80%']);
export const indicatorDevelopmentContentHeight = getDeviceStyle('75%', isShortScreenDevice() ? '86.5%' : '78%');

export const swotModalSnapPoints = getDeviceStyle(['77%'], ['77%']);
export const swotContentHeight = getDeviceStyle('75%', '75%');

export const settingModalSnapPoints = getDeviceStyle(['56%'], isShortScreenDevice() ? ['70%'] : isShortWidthScreen() ? ['75%'] : ['65%']);
export const settingContentHeight = getDeviceStyle('54%', isShortScreenDevice() ? ['68%'] : isShortWidthScreen() ? ['73%'] : ['63%']);

export const settingLanguageSnapPoints = getDeviceStyle(['28%'], ['30%']);
export const settingLanguageContentHeight = getDeviceStyle('27%', '28%');

export const settingEndpointModalSnapPoints = getDeviceStyle(['76%'], isShortScreenDevice() ? ['70%'] : isShortWidthScreen() ? ['75%'] : ['65%']);
export const settingEndpointContentHeight = getDeviceStyle('74%', isShortScreenDevice() ? ['68%'] : isShortWidthScreen() ? ['73%'] : ['63%']);

export const indicatorParticipantListModalSnapPoints = getDeviceStyle(['70%'], ['70%']);

export const indicatorParticipantListModalHeight = getDeviceStyle('68%', '68%');

export const scorecardPreferenceLangaugePickerSnapPoints = ['60%'];
export const scorecardPreferenceLanguagePickerContentHeight = '58%';

export const facilitatorPickerSnapPoints = getDeviceStyle(['60%', '100%'], ['65%', '100%']);
export const facilitatorPickerContentHeight = getDeviceStyle('58%', '63%');
export const facilitatorPickerContentExpanedHeight = '98%';