import { StyleSheet } from 'react-native';
import Color from '../../themes/color';
import { pressableItemSize } from '../../utils/component_util';
import { bodyFontSize } from '../../utils/font_size_util';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const ButtonForgetCodeComponentStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
    height: pressableItemSize()
  },
  containerMarginBottom: {
    marginBottom: 0,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: pressableItemSize(),
  },
  icon: {
    color: Color.whiteColor,
    fontSize: 24
  },
  label: {
    fontFamily: FontFamily.body,
    fontSize: bodyFontSize()
  }
});

export default ButtonForgetCodeComponentStyles;
