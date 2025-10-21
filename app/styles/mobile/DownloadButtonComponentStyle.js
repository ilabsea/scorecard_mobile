import { StyleSheet } from 'react-native';
import { isShortScreenDevice } from '../../utils/responsive_util';
import { bodyFontSize, bottomButtonFontSize, bottomButtonIconSize } from '../../utils/font_size_util';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import Color from '../../themes/color';

const DownloadButtonComponentStyles = StyleSheet.create({
  buttonLabel: {
    fontSize: bottomButtonFontSize(),
    fontFamily: FontFamily.body,
    textAlignVertical: 'center'
  },
  progressBar: {
    height: 20,
    marginBottom: 15,
  },
  downloadPercentageLabel: {
    fontSize: bodyFontSize()
  },
  icon: {
    fontSize: bottomButtonIconSize()
  },
  button: {
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: Color.clickableColor,
    height: isShortScreenDevice() ? 45 : 50,
    justifyContent: 'center',
  }
});

export default DownloadButtonComponentStyles;