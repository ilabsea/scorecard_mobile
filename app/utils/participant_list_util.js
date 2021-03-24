import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { getDeviceStyle, isShortScreenDevice } from './responsive_util';
import { lgLabelSize, mdLabelSize, mdIconSize } from '../constants/mobile_font_size_constant';

const numberContainerSize = getDeviceStyle(40, wp('8%'));
const numberLabelSize = getDeviceStyle(18, wp(lgLabelSize));
const textLabelSize = getDeviceStyle(16, wp(mdLabelSize));
const iconSize = getDeviceStyle(25, wp(mdIconSize));

export {
  numberContainerSize,
  numberLabelSize,
  textLabelSize,
  iconSize,
};