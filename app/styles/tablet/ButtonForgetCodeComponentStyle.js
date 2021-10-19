import { StyleSheet } from 'react-native';
import Color from '../../themes/color';

const ButtonForgetCodeComponentStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    color: Color.whiteColor,
    fontSize: 24
  },
  label: {
    fontSize: 16,
  }
});

export default ButtonForgetCodeComponentStyles;