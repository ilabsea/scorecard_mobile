import { Dimensions, PixelRatio } from 'react-native';
import DeviceInfo from 'react-native-device-info'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { smallMobileHeight, mediumMobileHeight, smallWidthMobile, XXHDPIRatio } from '../constants/screen_size_constant';
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

const isMediumScreenDevice = () => {
  return screenHeight <= mediumMobileHeight && !isShortScreenDevice();
}

const isShortWidthScreen = () => {
  return screenWidth <= smallWidthMobile;
}

const mobileHeadingTitleSize = () => {
  return isShortScreenDevice() ? wp(lgLabelSize) : wp('4.4%');
}

const mobileSubTitleSize = () => {
  return isShortScreenDevice() ? wp(mdLabelSize) : wp(lgLabelSize);
}

const modalHeadingTitleSize = () => {
  const tabletFontSize = 24;
  const mobileFontSize = wp(lgLabelSize);

  return getDeviceStyle(tabletFontSize, mobileFontSize);
}

const addNewParticipantModalHeight = () => {
  const mobileModalHeight = isShortScreenDevice() ? hp('94%') : hp('84%');
  return getDeviceStyle(650, mobileModalHeight);
}

const isSmallMobileScreenDevice = () => {
  if (PixelRatio.get() < XXHDPIRatio && screenHeight < smallMobileHeight)
    return true;

  return false;
}

const containerPaddingTop = getDeviceStyle(20, 10);

const normalLabelSize = getDeviceStyle(16, wp(mdLabelSize));

const scrollViewPaddingBottom = getDeviceStyle(28, hp('35%'));

const containerPadding = getDeviceStyle(20, 15);

const cardItemPadding = 16;

const navigationTitlePaddingLeft = getDeviceStyle(0, isShortWidthScreen() ? wp('4%') : wp('1%'));

const navigationBackButtonFlex =  getDeviceStyle(0.21, 0.15);

export {
  getDeviceStyle,
  isShortScreenDevice,
  isMediumScreenDevice,
  isShortWidthScreen,
  mobileHeadingTitleSize,
  mobileSubTitleSize,
  modalHeadingTitleSize,
  addNewParticipantModalHeight,
  isSmallMobileScreenDevice,
  containerPaddingTop,
  normalLabelSize,
  scrollViewPaddingBottom,
  containerPadding,
  cardItemPadding,
  navigationTitlePaddingLeft,
  navigationBackButtonFlex,
};