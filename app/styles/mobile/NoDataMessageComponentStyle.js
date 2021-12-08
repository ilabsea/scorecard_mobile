import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { xlLabelSize } from '../../constants/mobile_font_size_constant';
import { isShortScreenDevice } from '../../utils/responsive_util'

// 210 is the height of message container
const containerMarginTop = isShortScreenDevice() ? -(210 / 8) : -(210 / 4);

const NoDataMessageComponentStyles = StyleSheet.create({
  label: {
    fontSize: wp(xlLabelSize),
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

export default NoDataMessageComponentStyles;