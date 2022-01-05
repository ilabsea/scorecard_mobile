import { StyleSheet } from 'react-native';
import { bodyFontSize, bottomButtonFontSize } from '../../utils/font_size_util';

const DownloadButtonComponentStyles = StyleSheet.create({
  buttonLabel: {
    fontSize: bottomButtonFontSize(),
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
    height: 50
  }
});

export default DownloadButtonComponentStyles;