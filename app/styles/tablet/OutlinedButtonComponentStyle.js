import { StyleSheet } from 'react-native';
import { bodyFontSize, outlinedButtonIconSize } from '../../utils/font_size_util';

const OutlinedButtonComponentStyles = StyleSheet.create({
  buttonLabel: {
    fontSize: bodyFontSize()
  },
  buttonIcon: {
    fontSize: outlinedButtonIconSize()
  },
});

export default OutlinedButtonComponentStyles;