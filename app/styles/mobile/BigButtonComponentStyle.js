import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { xxlIconSize, xlIconSize } from '../../constants/mobile_font_size_constant';
import { isShortScreenDevice } from '../../utils/responsive_util';
import { bigButtonFontSize } from '../../utils/font_size_util';

const BigButtonComponentStyles = StyleSheet.create({
  button: {
    height: hp('10%'),
    width: wp('77%'),
  },
  icon: {
    fontSize: isShortScreenDevice() ? wp(xlIconSize) : wp(xxlIconSize),
    marginLeft: 15,
    marginRight: 15
  },
  label: {
    fontSize: bigButtonFontSize()
  }
});

export default BigButtonComponentStyles;