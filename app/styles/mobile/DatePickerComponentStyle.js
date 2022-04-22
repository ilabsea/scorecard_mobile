import { StyleSheet } from 'react-native';
import Color from '../../themes/color';
import { bodyFontSize, mobileDatePickerIconSize, smallTextFontSize } from '../../utils/font_size_util';

const DatePickerComponentStyles = StyleSheet.create({
  container: {
    marginTop: 20,
    position: 'relative',
  },
  label: {
    backgroundColor: Color.whiteColor,
    color: Color.inputBorderLineColor,
    fontSize: 12,
    marginLeft: 12,
    paddingHorizontal: 6,
    top: -10,
    zIndex: 10,
    position: 'absolute',
  },
  pickerContainer: {
    height: 60,
    paddingLeft: 14,
    borderColor: Color.inputBorderLineColor,
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  dateLabel: {
    fontSize: bodyFontSize(),
    marginLeft: 20,
    marginTop: 4
  },
  icon: {
    fontSize: mobileDatePickerIconSize()
  },
  messageLabel: {
    color: Color.orangeColor,
    fontSize: smallTextFontSize(),
    paddingTop: 5,
  }
});

export default DatePickerComponentStyles;