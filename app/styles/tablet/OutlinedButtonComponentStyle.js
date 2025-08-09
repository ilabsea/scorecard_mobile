import { StyleSheet } from 'react-native';
import { bodyFontSize, outlinedButtonIconSize, smallTextFontSize } from '../../utils/font_size_util';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const OutlinedButtonComponentStyles = StyleSheet.create({
  buttonLabel: {
    fontSize: bodyFontSize(),
    fontFamily: FontFamily.body,
  },
  buttonSubLabel: {
    color: Color.lightGrayColor,
    fontSize: smallTextFontSize(),
    textAlign: 'center'
  },
  buttonIcon: {
    fontSize: outlinedButtonIconSize()
  },
});

export default OutlinedButtonComponentStyles;