import { StyleSheet } from 'react-native';
import Color from '../../../themes/color';
import { FontFamily } from '../../../assets/stylesheets/theme/font';
import { mobileHeadingTitleSize, mobileSubTitleSize } from '../../../utils/responsive_util';

const HeaderTitleStyles = StyleSheet.create({
  headline: {
    color: Color.primaryColor,
    fontSize: mobileHeadingTitleSize(),
    fontFamily: FontFamily.title
  },
  subTitle: {
    fontSize: mobileSubTitleSize(),
    color: '#2e2e2e'
  }
});

export default HeaderTitleStyles;