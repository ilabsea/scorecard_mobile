import { StyleSheet } from 'react-native';
import { bodyFontSize, titleFontSize } from '../../utils/font_size_util';

const PopupModalComponentStyles = StyleSheet.create({
  headerTitle: {
    fontSize: titleFontSize(),
    marginBottom: 0,
    width: '100%',
    paddingRight: 5,
  },
  label: {
    fontSize: bodyFontSize()
  }
});

export default PopupModalComponentStyles;