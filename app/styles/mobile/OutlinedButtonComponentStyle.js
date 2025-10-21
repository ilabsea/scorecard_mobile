import { StyleSheet } from 'react-native';
import { bodyFontSize, outlinedButtonIconSize, getMobileFontSizeByPixelRatio } from '../../utils/font_size_util';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const OutlinedButtonComponentStyles = StyleSheet.create({
  buttonLabel: {
    fontSize: bodyFontSize(),
    fontFamily: FontFamily.body,
    paddingRight: 0,
  },
  buttonSubLabel: {
    color: Color.lightGrayColor,
    fontSize: getMobileFontSizeByPixelRatio(13, 14),
    fontFamily: FontFamily.body,
    textAlign: 'center'
  },
  buttonIcon: {
    fontSize: outlinedButtonIconSize(),
    marginLeft: 0,
    marginRight: 0,
  }
});

export default OutlinedButtonComponentStyles;