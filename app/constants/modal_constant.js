import { getDeviceStyle, isShortScreenDevice, isShortWidthScreen } from '../utils/responsive_util';

export const PROPOSED_INDICATOR = 'PROPOSED_INDICATOR';
export const INDICATOR_DEVELOPMENT = 'INDICATOR_DEVELOPMENT';
export const VOTING_INDICATOR = 'VOTING_INDICATOR';
export const SCORECARD_RESULT = 'SCORECARD_RESULT';

export const tipModalSnapPoints = {
  'PROPOSED_INDICATOR': [getDeviceStyle('53%', '49%'), getDeviceStyle('78%', isShortScreenDevice() ? '81%' : '76%')],
  'INDICATOR_DEVELOPMENT': [getDeviceStyle('37%', '43%')],
  'VOTING_INDICATOR': [getDeviceStyle('37%', isShortScreenDevice() ? '43%' : '41%')],
  'SCORECARD_RESULT': [getDeviceStyle('37%', isShortScreenDevice() ? '42%' : '47%')],
};

export const participantModalSnapPoints = getDeviceStyle(['70%'], isShortScreenDevice() ? ['85%'] : ['75%']);
export const participantContentHeight = getDeviceStyle('68%', isShortScreenDevice() ? '82%' : '72.5%');

export const participantListModalSnapPoints = getDeviceStyle(['85%'], ['82%']);
export const participantListContentHeight = getDeviceStyle('83%', '80%');

export const indicatorDevelopmentModalSnapPoints = getDeviceStyle(['77%'], isShortScreenDevice() ? ['89.5%']  : ['80%']);
export const indicatorDevelopmentContentHeight = getDeviceStyle('75%', isShortScreenDevice() ? '86.5%' : '78%');

export const swotModalSnapPoints = getDeviceStyle(['88%'], ['86%']);
export const swotContentHeight = getDeviceStyle('85.5%', '83.4%');

export const settingModalSnapPoints = getDeviceStyle(['56%'], isShortScreenDevice() ? ['70%'] : isShortWidthScreen() ? ['75%'] : ['65%']);
export const settingContentHeight = getDeviceStyle('54%', isShortScreenDevice() ? '68%' : isShortWidthScreen() ? '73%' : '63%');

export const settingLanguageSnapPoints = getDeviceStyle(['28%'], ['30%']);
export const settingLanguageContentHeight = getDeviceStyle('27%', '28%');

export const settingEndpointModalSnapPoints = ['75%'];
export const settingEndpointContentHeight = '73%';

export const settingReLoginInfoModalSnapPoints = getDeviceStyle(['36%'], ['37%']);
export const settingReLoginInfoContentHeight = getDeviceStyle('34%', '35%');

export const indicatorParticipantListModalSnapPoints = getDeviceStyle(['70%'], ['70%']);

export const indicatorParticipantListModalHeight = getDeviceStyle('68%', '68%');

export const scorecardPreferenceLangaugePickerSnapPoints = ['60%'];
export const scorecardPreferenceLanguagePickerContentHeight = '58%';

export const facilitatorPickerSnapPoints = getDeviceStyle(['60%', '100%'], ['65%', '100%']);
export const facilitatorPickerContentHeight = getDeviceStyle('58%', '63%');
export const facilitatorPickerContentExpanedHeight = getDeviceStyle('92%', '90%');
