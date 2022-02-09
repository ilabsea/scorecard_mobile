import DeviceInfo from 'react-native-device-info';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { isMediumScreenDevice, isShortScreenDevice } from './responsive_util';

export const getScorecardListInstructionImage = () => {
  if (DeviceInfo.isTablet())
    return require('../assets/images/tablet_swipe_down_sync_scorecard.gif');

  return require('../assets/images/mobile_swipe_down_sync_scorecard.gif');
}

export const getScorecardListInstructionModalMarginTop = (headerHeight) => {
  if (DeviceInfo.isTablet())
    return (headerHeight + wp('22.1%')) * -1;

  let extraMargin = isShortScreenDevice() ? wp('10%') : wp('22%');
  return (headerHeight + extraMargin) * -1;
}

export const getIndicatorDevelopmentInstructionImage = () => {
  if (DeviceInfo.isTablet())
    return require('../assets/images/tablet_drag_and_drop.gif');

  return (isMediumScreenDevice() || isShortScreenDevice()) 
    ? require('../assets/images/small_mobile_drag_drop.gif')
    : require('../assets/images/mobile_drag_drop.gif');
}

export const getIndicatorDevelopmentInstructionModalMarginTop = (headerHeight) => {
  if (DeviceInfo.isTablet())
    return headerHeight

  let extraMargin = isMediumScreenDevice() ? wp('4%') : wp('5%');
  if (isShortScreenDevice())
    extraMargin = wp('11%');

  return headerHeight + extraMargin;
}