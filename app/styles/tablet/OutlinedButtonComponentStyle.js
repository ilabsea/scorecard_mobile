import { StyleSheet } from 'react-native';
import { bodyFontSize, outlinedButtonIconSize, smallTextFontSize } from '../../utils/font_size_util';
import Color from '../../themes/color';

const OutlinedButtonComponentStyles = StyleSheet.create({
  buttonLabel: {
    fontSize: bodyFontSize()
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