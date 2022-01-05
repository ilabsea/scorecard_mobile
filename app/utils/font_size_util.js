import { PixelRatio } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { HDPIRatio, XHDPIRatio } from '../constants/screen_size_constant';

export const bodyFontSize = () => {
  const mobileFontSize = getMobileFontSizeByPixelRatio(HDPIRatio, 11, 14);
  return getFontSizeByDevice(16, mobileFontSize);
}

export const bigButtonFontSize = () => {
  const mobileFontSize = getMobileFontSizeByPixelRatio(XHDPIRatio, 19, 17);
  return getFontSizeByDevice(20, mobileFontSize);
}

export const mobileNormalLabelFontSize = PixelRatio.get() <= HDPIRatio ? 11 : 14;

// Private method
const getFontSizeByDevice = (tabletFontSize, mobileFontSize) => {
  return DeviceInfo.isTablet() ? tabletFontSize : mobileFontSize;
}

const getMobileFontSizeByPixelRatio = (pixelRatio, smallRatioFontSize, bigRationFontSize) => {
  const devicePixelRatio = Math.round(PixelRatio.roundToNearestPixel(PixelRatio.get()));
  return devicePixelRatio <= pixelRatio ? smallRatioFontSize : bigRationFontSize;
}