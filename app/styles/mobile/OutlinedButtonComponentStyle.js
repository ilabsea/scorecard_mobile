import { StyleSheet } from 'react-native';
import { bodyFontSize, outlinedButtonIconSize, getMobileFontSizeByPixelRatio } from '../../utils/font_size_util';
import Color from '../../themes/color';

const OutlinedButtonComponentStyles = StyleSheet.create({
  buttonLabel: {
    fontSize: bodyFontSize(),
    paddingRight: 0,
  },
  buttonSubLabel: {
    color: Color.lightGrayColor,
    fontSize: getMobileFontSizeByPixelRatio(13, 14),
    textAlign: 'center'
  },
  buttonIcon: {
    fontSize: outlinedButtonIconSize(),
    marginLeft: 0,
    marginRight: 0,
  }
});

export default OutlinedButtonComponentStyles;