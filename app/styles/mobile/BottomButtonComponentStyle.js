import { StyleSheet } from 'react-native';
import { isShortScreenDevice } from '../../utils/responsive_util';
import { bottomButtonFontSize, bottomButtonIconSize } from '../../utils/font_size_util';
import Color from '../../themes/color';
import { buttonBorderRadius } from '../../constants/border_radius_constant';
import { textLineHeight } from '../../constants/component_style_constant';
import { FontFamily } from '../../assets/stylesheets/theme/font';

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
    height: isShortScreenDevice() ? 48 : 50,
    flexDirection: 'row',
    borderRadius: buttonBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16
  }
});

export default BottomButtonComponentStyles;