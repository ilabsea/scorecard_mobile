import { StyleSheet } from 'react-native';
import { bodyFontSize, titleFontSize, smallTextFontSize } from '../../utils/font_size_util';
import { containerPadding } from '../../utils/responsive_util';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const PopupModalComponentStyles = StyleSheet.create({
  headerTitle: {
    fontSize: titleFontSize(),
    marginBottom: 0,
    width: '100%',
    paddingRight: 5,
  },
  label: {
    fontSize: bodyFontSize()
  },
  subTitle: {
    marginLeft: containerPadding,
    fontSize: smallTextFontSize(),
    fontFamily: FontFamily.body,
    color: Color.grayColor
  }
});

export default PopupModalComponentStyles;