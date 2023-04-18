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

export const participantModalSnapPoints = getDeviceStyle(['82.5%'], ['90%']);
export const participantModalContentHeight = getDeviceStyle('80%', '87%');

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

export const scorecardPreferenceLangaugePickerSnapPoints = ['60%'];
export const scorecardPreferenceLanguagePickerContentHeight = '58%';

export const facilitatorPickerSnapPoints = getDeviceStyle(['60%', '100%'], ['65%', '100%']);
export const facilitatorPickerContentHeight = getDeviceStyle('58%', '63%');
export const facilitatorPickerContentExpanedHeight = getDeviceStyle('92%', '90%');

export const votingConfirmationSnapPoints = getDeviceStyle(['73%'], isShortWidthScreen() ? ['68%'] : ['70%']);
export const votingConfirmationContentHeight = getDeviceStyle('71%', isShortWidthScreen() ? '66%' : '68%');

export const anonymousParticipantDetailSnapPoints = getDeviceStyle(['51%'], isShortScreenDevice() ? ['71%'] : ['57%']);
export const anonymousParticipantDetailContentHeight = getDeviceStyle('49%', isShortScreenDevice() ? '67%' : '55%');

export const customIndicatorModalSnapPoints = getDeviceStyle(['60%'], isShortScreenDevice() ? ['70%'] :['60%']);
export const customIndicatorModalContentHeight = getDeviceStyle('58%', isShortWidthScreen() ? '67%' :'58%');