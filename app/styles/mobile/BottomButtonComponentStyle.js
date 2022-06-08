import { StyleSheet } from 'react-native';
import { isShortScreenDevice } from '../../utils/responsive_util';
import { bottomButtonFontSize, bottomButtonIconSize } from '../../utils/font_size_util';
import Color from '../../themes/color';

const BottomButtonComponentStyles = StyleSheet.create({
  buttonLabel: {
    fontSize: bottomButtonFontSize(),
    flex: 1,
    textAlign: 'center',
    color: Color.whiteColor
  },
  buttonIcon: {
    color: Color.whiteColor,
    fontSize: bottomButtonIconSize()
  },
  buttonContainer: {
    height: isShortScreenDevice() ? 48 : 50,
  }
});

export default BottomButtonComponentStyles;