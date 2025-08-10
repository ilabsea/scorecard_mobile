import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { isShortScreenDevice } from '../../utils/responsive_util';
import { pressableItemSize } from '../../utils/component_util';
import { bodyFontSize } from '../../utils/font_size_util';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const ButtonForgetCodeComponentStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: isShortScreenDevice() ? 5 : 10,
    marginBottom: isShortScreenDevice() ? -wp('3%') : -wp('12%'),
    height: pressableItemSize(),
    justifyContent: 'center',
  },
  containerMarginBottom: {
    marginBottom: isShortScreenDevice() ? -wp('4%') : -wp('10%'),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: isShortScreenDevice() ? 0 : 10,
    marginBottom: isShortScreenDevice() ? -10 : 0,
    height: pressableItemSize(),
  },
  icon: {
    color: Color.whiteColor,
    fontSize: isShortScreenDevice() ? wp('4.5%') : wp('5.2%'),
    marginTop: -8
  },
  label: {
    fontFamily: FontFamily.body,
    fontSize: bodyFontSize(),
    marginTop: -6
  }
});

export default ButtonForgetCodeComponentStyles;