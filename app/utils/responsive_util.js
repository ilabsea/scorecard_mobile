import { Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { smallMobileHeight, smallWidthMobile } from '../constants/screen_size_constant';
import { xlLabelSize, lgLabelSize, mdLabelSize } from '../constants/mobile_font_size_constant';

const isTablet = DeviceInfo.isTablet();
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const getDeviceStyle = (tabletStyle, mobileStyle) => {
  return isTablet ? tabletStyle : mobileStyle;
}

const isShortScreenDevice = () => {
  return screenHeight <= smallMobileHeight;
}

const isShortWidthScreen = () => {
  return screenWidth <= smallWidthMobile;
}

const mobileHeadingTitleSize = () => {
  return isShortScreenDevice() ? wp(lgLabelSize) : wp(xlLabelSize);
}

const mobileSubTitleSize = () => {
  return isShortScreenDevice() ? wp(mdLabelSize) : wp(lgLabelSize);
}

const modalHeadingTitleSize = () => {
  const tabletFontSize = 24;
  const mobileFontSize = mobileHeadingTitleSize();

  return getDeviceStyle(tabletFontSize, mobileFontSize);
}

const addNewParticipantModalHeight = () => {
  const mobileModalHeight = isShortScreenDevice() ? hp('94%') : hp('82%');
  return getDeviceStyle(650, mobileModalHeight);
}

const containerPaddingTop = getDeviceStyle(20, 10);

const normalLabelSize = getDeviceStyle(16, wp(mdLabelSize));

const scrollViewPaddingBottom = getDeviceStyle(28, hp('35%'));

const containerPadding = getDeviceStyle(20, 15);

export {
  getDeviceStyle,
  isShortScreenDevice,
  isShortWidthScreen,
  mobileHeadingTitleSize,
  mobileSubTitleSize,
  modalHeadingTitleSize,
  addNewParticipantModalHeight,
  containerPaddingTop,
  normalLabelSize,
  scrollViewPaddingBottom,
  containerPadding,
};