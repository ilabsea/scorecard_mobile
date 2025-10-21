import { StyleSheet } from 'react-native';
import Color from '../../themes/color';
import { bottomButtonFontSize, bottomButtonIconSize } from '../../utils/font_size_util';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { buttonBorderRadius } from '../../constants/border_radius_constant';
import { textLineHeight } from '../../constants/component_style_constant';

const BottomButtonComponentStyles = StyleSheet.create({
  buttonLabel: {
    fontSize: bottomButtonFontSize(),
    fontFamily: FontFamily.body,
    flex: 1,
    textAlign: 'center',
    color: Color.whiteColor,
    lineHeight: textLineHeight
  },
  buttonIcon: {
    color: Color.whiteColor,
    fontSize: bottomButtonIconSize()
  },
  buttonContainer: {
    height: 50,
    flexDirection: 'row',
    borderRadius: buttonBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16
  }
});

export default BottomButtonComponentStyles;