import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../themes/color';
import { bodyFontSize, smallTextFontSize } from '../../utils/font_size_util';

const IndicatorAccordionComponentStyles = StyleSheet.create({
  container: {
    height: 105,
    marginTop: 10,
    paddingHorizontal: 14
  },
  label: {
    fontSize: bodyFontSize()
  },
  subLabel: {
    fontSize: smallTextFontSize(),
    // color: Color.grayColor,
    // marginTop: 2
  },
});

export default IndicatorAccordionComponentStyles;