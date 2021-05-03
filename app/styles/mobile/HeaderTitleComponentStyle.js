import { StyleSheet } from 'react-native';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { mobileHeadingTitleSize, mobileSubTitleSize } from '../../utils/responsive_util';

const HeaderTitleComponentStyles = StyleSheet.create({
  headline: {
    color: Color.primaryColor,
    fontSize: mobileHeadingTitleSize(),
    fontFamily: FontFamily.title
  },
  subTitle: {
    fontSize: mobileSubTitleSize(),
    color: Color.lightBlackColor,
  }
});

export default HeaderTitleComponentStyles;