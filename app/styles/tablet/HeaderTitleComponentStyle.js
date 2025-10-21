import { StyleSheet } from 'react-native';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { titleFontSize, subTitleFontSize } from '../../utils/font_size_util';

const HeaderTitleComponentStyles = StyleSheet.create({
  headline: {
    color: Color.primaryColor,
    fontSize: titleFontSize(),
    fontFamily: FontFamily.title
  },
  subTitle: {
    fontSize: subTitleFontSize(),
    fontFamily: FontFamily.body,
    color: Color.lightBlackColor,
  }
});

export default HeaderTitleComponentStyles;