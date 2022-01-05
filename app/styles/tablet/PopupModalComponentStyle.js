import { StyleSheet } from 'react-native';
import { bodyFontSize, modalTitleFontSize } from '../../utils/font_size_util';

const PopupModalComponentStyles = StyleSheet.create({
  headerTitle: {
    fontSize: modalTitleFontSize(),
    marginBottom: 0,
  },
  label: {
    fontSize: bodyFontSize(),
  }
});

export default PopupModalComponentStyles;