import { StyleSheet } from 'react-native';
import Color from './color';

const selectPickerStyle = StyleSheet.create({
  inputLabel: {
    backgroundColor: Color.whiteColor,
    color: Color.inputBorderLineColor,
    fontSize: 12,
    marginLeft: 12,
    paddingHorizontal: 6,
    position: 'absolute',
  },
  container: {
    marginTop: 20,
    position: 'relative',
  },
  containerStyle: {
    height: 60,
    marginTop: 10,
  },
  dropDownContainerStyle: {
    backgroundColor: '#fdfdfd',
    borderColor: Color.lightGrayColor,
  },
  dropDownPickerStyle: {
    backgroundColor: Color.whiteColor,
    zIndex: 5000,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderWidth: 1,
    borderColor: Color.inputBorderLineColor,
    height: 58,
  },
});

export default selectPickerStyle;