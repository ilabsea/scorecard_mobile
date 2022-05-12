import { StyleSheet } from 'react-native';
import { bodyFontSize, titleFontSize } from '../../utils/font_size_util';
import { containerPadding } from '../../utils/responsive_util';

const PopupModalComponentStyles = StyleSheet.create({
  headerTitle: {
    fontSize: titleFontSize(),
    marginBottom: 0,
    paddingVertical: containerPadding,
    flex: 1,
    paddingRight: 5
  },
  label: {
    fontSize: bodyFontSize(),
  }
});

export default PopupModalComponentStyles;