import { Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { smallMobileScreenWidth } from '../constants/device_size_constant';

const isTablet = DeviceInfo.isTablet();
const screenWidth = Dimensions.get('screen').width;

const getResponsiveSize = (tabletSize, mobileSize) => {
  return isTablet ? tabletSize : mobileSize;
}

const getBigButtonWidth = () => {
  let mobileWidth = '68%';

  if (screenWidth <= smallMobileScreenWidth )
    mobileWidth = '78%';

  return getResponsiveSize('65%', mobileWidth);
}

const getBigButtonHeight = () => {
  return getResponsiveSize(86, 66);
}

const getTitleFontSize = () => {
  return getResponsiveSize(20, 18);
}

const getLabelFontSize = () => {
  return getResponsiveSize(16, 14);
}

const getIconFontSize = () => {
  return getResponsiveSize(24, 20)
}

export {
  getResponsiveSize,
  getBigButtonWidth,
  getBigButtonHeight,
  getTitleFontSize,
  getLabelFontSize,
  getIconFontSize,
};