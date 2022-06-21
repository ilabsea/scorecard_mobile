import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { isShortScreenDevice } from '../../utils/responsive_util'
import { getMobileFontSizeByPixelRatio } from '../../utils/font_size_util';

// 210 is the height of message container
const containerMarginTop = isShortScreenDevice() ? -(210 / 8) : -(210 / 4);

const EmptyListActionComponentStyles = StyleSheet.create({
  label: {
    fontSize: getMobileFontSizeByPixelRatio(19, 17),
    marginVertical: 10
  },
  icon: {
    fontSize: wp('22%'),
    color: '#bab7ba',
  },
  messageContainer: {
    marginTop: containerMarginTop,
    alignItems: 'center',
    height: 210
  }
});

export default EmptyListActionComponentStyles;