import { StyleSheet } from 'react-native';
import Color from '../../themes/color';
import { bodyFontSize, smallTextFontSize } from '../../utils/font_size_util';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const DatePickerComponentStyles = StyleSheet.create({
  container: {
    marginTop: 20,
    position: 'relative',
  },
  label: {
    backgroundColor: Color.whiteColor,
    color: Color.inputBorderLineColor,
    fontSize: 12,
    fontFamily: FontFamily.body,
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
    fontFamily: FontFamily.body,
    marginLeft: 20,
    marginTop: 4
  },
  icon: {
    fontSize: 25,
  },
  messageLabel: {
    color: Color.orangeColor,
    fontSize: smallTextFontSize(),
    fontFamily: FontFamily.body,
    paddingTop: 5
  }
});

export default DatePickerComponentStyles;