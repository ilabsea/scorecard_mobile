import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { smLabelSize } from '../../constants/mobile_font_size_constant';
import Color from '../../themes/color';

const mdMobileTitleWidth = wp('25%');
const smMobileTitleWidth = 75;

const ProgressStepComponentStyles = StyleSheet.create({
  title: {
    paddingTop: 2,
    paddingHorizontal: 2,
    fontSize: wp(smLabelSize),
    textAlign: 'center',
    color: Color.horizontalLineColor,
  },
  smallTitle: {
    fontSize: wp('3.1%'),
  }
});

export default ProgressStepComponentStyles;
export { mdMobileTitleWidth, smMobileTitleWidth };