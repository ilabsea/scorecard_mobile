import { Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info'
import { smallMobileHeight } from '../constants/screen_size_constant';

const isTablet = DeviceInfo.isTablet();
const screenHeight = Dimensions.get('screen').height;

const getDeviceStyle = (tabletStyle, mobileStyle) => {
  return isTablet ? tabletStyle : mobileStyle;
}

const isShortScreenDevice = () => {
  return screenHeight <= smallMobileHeight;
}

const containerPaddingTop = getDeviceStyle(20, 10);

export { getDeviceStyle, isShortScreenDevice, containerPaddingTop };