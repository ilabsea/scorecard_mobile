import { PixelRatio } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { isShortScreenDevice } from './responsive_util';
import { HDPIRatio, XHDPIRatio } from '../constants/screen_size_constant';

// tablet: 16dp, mobile ratio <= 2: 16dp, mobile ratio > 2: 14dp
export const bodyFontSize = () => {
  const mobileFontSize = getMobileFontSizeByPixelRatio(XHDPIRatio, 16, 14);
  return getFontSizeByDevice(16, mobileFontSize);
}

// tablet: 20dp, mobile ratio <= 2: 18dp, mobile ratio > 2 : 16dp
export const modalTitleFontSize = () => {
  const mobileFontSize = getMobileFontSizeByPixelRatio(XHDPIRatio, 18, 16);
  return getFontSizeByDevice(20, mobileFontSize);
}

// tablet: 20dp, mobile ratio <= 2: 19dp, mobile ratio > 2: 17dp
export const bigButtonFontSize = () => {
  const mobileFontSize = getMobileFontSizeByPixelRatio(XHDPIRatio, 19, 17);
  return getFontSizeByDevice(20, mobileFontSize);
}

// tablet: 14dp, mobile ratio <= 2: 14dp, mobile ratio > 2: 12dp
export const smallTextFontSize = () => {
  const mobileFontSize = getMobileFontSizeByPixelRatio(XHDPIRatio, 14, 12);
  return getFontSizeByDevice(14, mobileFontSize);
}

export const smallIconSize = () => {
  const mobileFontSize = getMobileFontSizeByPixelRatio(XHDPIRatio, 18, 16);
  return getFontSizeByDevice(18, mobileFontSize)
}

export const mobileNormalLabelFontSize = PixelRatio.get() <= HDPIRatio ? 11 : 14;

// Private method
const getFontSizeByDevice = (tabletFontSize, mobileFontSize) => {
  return DeviceInfo.isTablet() ? tabletFontSize : mobileFontSize;
}

const getMobileFontSizeByPixelRatio = (pixelRatio, smallRatioFontSize, bigRatioFontSize) => {
  const devicePixelRatio = Math.round(PixelRatio.roundToNearestPixel(PixelRatio.get()));
  const fontSize = devicePixelRatio <= pixelRatio ? smallRatioFontSize : bigRatioFontSize;

  return isShortScreenDevice() ? fontSize - 1 : fontSize;
}