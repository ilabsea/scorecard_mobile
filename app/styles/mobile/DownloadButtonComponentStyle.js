import { StyleSheet } from 'react-native';
import { isShortScreenDevice } from '../../utils/responsive_util';
import { bodyFontSize, bottomButtonFontSize, bottomButtonIconSize } from '../../utils/font_size_util';

const DownloadButtonComponentStyles = StyleSheet.create({
  buttonLabel: {
    fontSize: bottomButtonFontSize(),
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
    height: isShortScreenDevice() ? 45 : 50,
  }
});

export default DownloadButtonComponentStyles;