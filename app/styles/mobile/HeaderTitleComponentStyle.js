import { StyleSheet } from 'react-native';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { modalTitleFontSize, subTitleFontSize } from '../../utils/font_size_util';

const HeaderTitleComponentStyles = StyleSheet.create({
  headline: {
    color: Color.primaryColor,
    fontSize: modalTitleFontSize(),
    fontFamily: FontFamily.title
  },
  subTitle: {
    fontSize: subTitleFontSize(),
    color: Color.lightBlackColor,
  }
});

export default HeaderTitleComponentStyles;