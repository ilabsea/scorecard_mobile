import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { mdLabelSize, smLabelSize } from '../../constants/mobile_font_size_constant';
import { isShortScreenDevice } from '../../utils/responsive_util';
import Color from '../../themes/color';

const ButtonForgetCodeComponentStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: isShortScreenDevice() ? 5 : 10,
    marginBottom: isShortScreenDevice() ? -wp('3%') : -wp('12%')
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: isShortScreenDevice() ? 0 : 10,
    marginBottom: isShortScreenDevice() ? -10 : 0,
  },
  icon: {
    color: Color.whiteColor,
    fontSize: isShortScreenDevice() ? wp('4.5%') : wp('5.2%'),
  },
  label: {
    fontSize: isShortScreenDevice() ? wp(smLabelSize) : wp(mdLabelSize),
  }
});

export default ButtonForgetCodeComponentStyles;