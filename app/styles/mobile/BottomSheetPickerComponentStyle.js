import { StyleSheet } from 'react-native';
import Color from '../../themes/color';
import { bodyFontSize } from '../../utils/font_size_util';

const BottomSheetPickerComponentStyles = StyleSheet.create({
  mainContainer: {
    borderWidth: 1,
    borderColor: Color.inputBorderLineColor,
    borderRadius: 4,
    marginTop: 5,
    height: 58,
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

export default BottomSheetPickerComponentStyles;