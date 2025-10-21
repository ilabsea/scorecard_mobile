import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { smLabelSize } from '../../constants/mobile_font_size_constant';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const mdMobileTitleWidth = wp('25%');
const smMobileTitleWidth = 75;

const ProgressStepComponentStyles = StyleSheet.create({
  title: {
    paddingTop: 2,
    paddingHorizontal: 4,
    fontSize: wp(smLabelSize),
    fontFamily: FontFamily.body,
    textAlign: 'center',
    color: Color.horizontalLineColor,
  },
  smallTitle: {
    fontSize: wp('3.1%'),
  }
});

export default ProgressStepComponentStyles;
export { mdMobileTitleWidth, smMobileTitleWidth };