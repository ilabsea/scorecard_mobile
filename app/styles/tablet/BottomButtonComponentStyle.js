import { StyleSheet } from 'react-native';
import Color from '../../themes/color';
import { bottomButtonFontSize, bottomButtonIconSize } from '../../utils/font_size_util';

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
    height: 50
  }
});

export default BottomButtonComponentStyles;