import { StyleSheet } from 'react-native';
import { bodyFontSize, titleFontSize } from '../../utils/font_size_util';
import { containerPadding } from '../../utils/responsive_util';

const PopupModalComponentStyles = StyleSheet.create({
  headerTitle: {
    fontSize: titleFontSize(),
    marginBottom: 0,
    paddingVertical: containerPadding
  },
  label: {
    fontSize: bodyFontSize(),
  }
});

export default PopupModalComponentStyles;