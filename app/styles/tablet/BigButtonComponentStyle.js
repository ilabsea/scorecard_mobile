import { StyleSheet } from 'react-native';
import { bigButtonFontSize } from '../../utils/font_size_util';

const BigButtonComponentStyles = StyleSheet.create({
  button: {
    height: 86,
    width: '65%',
    maxWidth: 360,
  },
  icon: {
    fontSize: 48,
    marginLeft: 24,
    marginRight: 40
  },
  label: {
    fontSize: bigButtonFontSize()
  },
});

export default BigButtonComponentStyles;