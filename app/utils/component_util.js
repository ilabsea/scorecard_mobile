import DeviceInfo from 'react-native-device-info'
import { MIN_MODERN_ANDROID_SDK_LEVEL } from '../constants/main_constant';

const defaultItemSize = 48;

export const listItemPaddingVertical = 12;

// receive the component padding (vertical or horizontal) as parameter
export const pressableItemSize = (padding = 0) => {
  return defaultItemSize + padding;
}

export const screenPaddingBottom = (sdkVersion) => {
  if (DeviceInfo.isTablet())
    return 0;

  return sdkVersion >= MIN_MODERN_ANDROID_SDK_LEVEL ? 16 : 0;
}

export const modalContentPaddingBottom = (sdkVersion) => {
  if (DeviceInfo.isTablet())
    return 22;

  return sdkVersion >= MIN_MODERN_ANDROID_SDK_LEVEL ? 18 : 0;
}