import DeviceInfo from 'react-native-device-info'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { isShortScreenDevice, isMediumScreenDevice } from '../utils/responsive_util';

const indicatorDevelopmentHelper = (() => {
  return {
    getInstructionModalMarginTop,
    getInstructionImage,
  }

  function getInstructionModalMarginTop(headerHeight) {
    if (DeviceInfo.isTablet())
      return headerHeight + wp('15%');

    let extraMargin = isMediumScreenDevice() ? wp('4%') : wp('21%');
    return headerHeight + extraMargin;
  }

  function getInstructionImage() {
    if (DeviceInfo.isTablet())
      return require('../assets/images/tablet_drag_and_drop.gif');

    return (isMediumScreenDevice() || isShortScreenDevice()) 
      ? require('../assets/images/small_mobile_drag_drop.gif')
      : require('../assets/images/mobile_drag_drop.gif');
  }
})();

export default indicatorDevelopmentHelper;