import { StyleSheet } from 'react-native';
import Color from './color';

const customDropdownPickerStyle = StyleSheet.create({
  wrapperContainer: {
    height: 60,
    position: 'relative'
  },
  titleLabel: {
    backgroundColor: Color.whiteColor,
    color: Color.inputBorderLineColor,
    fontSize: 12,
    marginLeft: 12,
    paddingHorizontal: 6,
    position: 'absolute',
    top: -10,
    zIndex: 60000
  },
  mainContainer: {
    borderRadius: 4,
    height: 58,
  },
  dropDownContainer: {
    borderColor: Color.lightGrayColor
  },
  unselectedBorder: {
    borderColor: Color.inputBorderLineColor,
    borderWidth: 1,
  },
  selectedBorder: {
    borderColor: Color.grayColor,
    borderWidth: 2
  }
});

export default customDropdownPickerStyle;