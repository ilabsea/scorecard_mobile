import { StyleSheet } from 'react-native';
import Color from '../../themes/color';

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
    borderWidth: 2,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  dateLabel: {
    fontSize: 16,
    marginLeft: 20,
    marginTop: 4
  },
  icon: {
    fontSize: 25,
  },
  messageLabel: {
    color: Color.errorColor,
    fontSize: 14,
  }
});

export default DatePickerComponentStyles;