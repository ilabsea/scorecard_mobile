import { StyleSheet } from 'react-native';
import { bodyFontSize, outlinedButtonIconSize } from '../../utils/font_size_util';

const OutlinedButtonComponentStyles = StyleSheet.create({
  buttonLabel: {
    fontSize: bodyFontSize(),
    paddingRight: 0,
  },
  buttonIcon: {
    fontSize: outlinedButtonIconSize(),
    marginLeft: 0,
    marginRight: 0,
  }
});

export default OutlinedButtonComponentStyles;