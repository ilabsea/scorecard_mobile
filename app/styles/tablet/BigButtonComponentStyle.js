import { StyleSheet } from 'react-native';
import { bigButtonFontSize } from '../../utils/font_size_util';
import { FontFamily } from '../../assets/stylesheets/theme/font';

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
    fontSize: bigButtonFontSize(),
    fontFamily: FontFamily.body
  },
});

export default BigButtonComponentStyles;