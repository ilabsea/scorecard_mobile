import { StyleSheet } from 'react-native';
import Color from '../../themes/color';

const instructionModalComponentStyles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  closeButtonContainer: {
    backgroundColor: Color.whiteColor,
    padding: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  closeButton: {
    backgroundColor: Color.whiteColor,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: Color.clickableColor,
    borderRadius: 5
  },
  closeButtonLabel: {
    color: Color.clickableColor
  }
});

export default instructionModalComponentStyles;