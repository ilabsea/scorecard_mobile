import { StyleSheet } from 'react-native';
import Color from '../../themes/color';
import { bodyFontSize } from '../../utils/font_size_util';

const SettingProposedIndicatorMethodPickerComponentStyles = StyleSheet.create({
  mainContainer: {
    borderWidth: 2,
    borderColor: Color.grayColor,
    borderRadius: 4,
    marginTop: 5,
    height: 55,
    position: 'relative'
  },
  titleLabel: {
    backgroundColor: Color.whiteColor,
    color: Color.inputBorderLineColor,
    fontSize: 12,
    marginLeft: 12,
    paddingHorizontal: 6,
    position: 'absolute',
    top: -12,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    paddingLeft: 14
  },
  valueLabel: {
    flex: 1,
    fontSize: bodyFontSize()
  },
  chooseLabel: {
    color: Color.clickableColor,
    paddingRight: 12,
    textTransform: 'uppercase',
    fontSize: bodyFontSize()
  }
});

export default SettingProposedIndicatorMethodPickerComponentStyles;