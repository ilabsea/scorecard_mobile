import { StyleSheet } from 'react-native';
import Color from '../../themes/color';

const BottomButtonComponentStyles = StyleSheet.create({
  buttonLabel: {
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
    color: Color.whiteColor
  },
  buttonIcon: {
    color: Color.whiteColor
  },
  buttonContainer: {
    height: 50
  }
});

export default BottomButtonComponentStyles;