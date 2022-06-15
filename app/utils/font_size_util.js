import { PixelRatio } from 'react-native';
import { isShortScreenDevice, getDeviceStyle } from './responsive_util';
import { XHDPIRatio } from '../constants/screen_size_constant';

// if the device pixel ratio <= 2 return smallRatioFontSize, if pixel ratio > 2 return bigRatioFontSize
export const getMobileFontSizeByPixelRatio = (smallRatioFontSize, bigRatioFontSize) => {
  const devicePixelRatio = Math.round(PixelRatio.roundToNearestPixel(PixelRatio.get()));
  const fontSize = devicePixelRatio <= XHDPIRatio ? smallRatioFontSize : bigRatioFontSize;

  return isShortScreenDevice() ? fontSize - 1 : fontSize;
}

export const bodyFontSize = () => {
  const mobileFontSize = getMobileFontSizeByPixelRatio(16, 14);
  return getDeviceStyle(16, mobileFontSize);
}

export const titleFontSize = () => {
  const mobileFontSize = getMobileFontSizeByPixelRatio(18, 16);
  return getDeviceStyle(20, mobileFontSize);
}

export const smallTitleFontSize = () => {
  const mobileFontSize = getMobileFontSizeByPixelRatio(16, 14);
  return getDeviceStyle(17, mobileFontSize);
}

export const bigNavigationHeaderTitleFontSize = () => {
  const mobileFontSize = getMobileFontSizeByPixelRatio(26, 24);
  return getDeviceStyle(28, mobileFontSize);
}

export const navigationHeaderTitleFontSize = () => {
  const mobileFontSize = getMobileFontSizeByPixelRatio(18, 17);
  return getDeviceStyle(19, mobileFontSize);
}

export const bigTitleFontSize = () => {
  const mobileFontSize = getMobileFontSizeByPixelRatio(18, 17);
  return getDeviceStyle(20, mobileFontSize);
}

export const subTitleFontSize = () => {
  const mobileFontSize = getMobileFontSizeByPixelRatio(18, 16);
  return getDeviceStyle(18, mobileFontSize);
}

export const bottomButtonFontSize = () => {
  const mobileFontSize = getMobileFontSizeByPixelRatio(18, 16);
  return getDeviceStyle(20, mobileFontSize);
}

export const bottomButtonIconSize = () => {
  const mobileFontSize = getMobileFontSizeByPixelRatio(26, 24);
  return getDeviceStyle(28, mobileFontSize);
}

export const bigButtonFontSize = () => {
  const mobileFontSize = getMobileFontSizeByPixelRatio(19, 17);
  return getDeviceStyle(20, mobileFontSize);
}

export const smallTextFontSize = () => {
  const mobileFontSize = getMobileFontSizeByPixelRatio(14, 12);
  return getDeviceStyle(14, mobileFontSize);
}

export const mediumIconSize = () => {
  const mobileFontSize = getMobileFontSizeByPixelRatio(20, 18);
  return getDeviceStyle(20, mobileFontSize);
}

export const mediumTransgenderIconSize = () => {
  return 25;
}

export const smallIconSize = () => {
  const mobileFontSize = getMobileFontSizeByPixelRatio(18, 16);
  return getDeviceStyle(18, mobileFontSize)
}

export const mobileDatePickerIconSize = () => {
  return getMobileFontSizeByPixelRatio(20, 18);
}

export const outlinedButtonIconSize = () => {
  const mobileFontSize = getMobileFontSizeByPixelRatio(20, 18);
  return getDeviceStyle(24, mobileFontSize);
}

export const accordionItemFontSize = () => {
  const mobileFontSize = getMobileFontSizeByPixelRatio(14, 13);
  return getDeviceStyle(16, mobileFontSize);
}

export const requireSignFontSize = () => {
  return 14;
}