import { StyleSheet } from 'react-native';
import { bodyFontSize, bottomButtonFontSize } from '../../utils/font_size_util';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import Color from '../../themes/color';

const DownloadButtonComponentStyles = StyleSheet.create({
  buttonLabel: {
    fontSize: bottomButtonFontSize(),
    fontFamily: FontFamily.body,
    textAlignVertical: 'center'
  },
  progressBar: {
    height: 30,
    marginBottom: 20,
  },
  downloadPercentageLabel: {
    marginTop: 4,
    fontSize: bodyFontSize(),
  },
  icon: {
    fontSize: 24
  },
  button: {
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: Color.clickableColor,
    height: 50,
    justifyContent: 'center',
  }
});

export default DownloadButtonComponentStyles;