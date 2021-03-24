import { StyleSheet } from 'react-native';
import Color from '../../../themes/color';
import { FontFamily } from '../../../assets/stylesheets/theme/font';

const HeaderTitleStyles = StyleSheet.create({
  headline: {
    color: Color.primaryColor,
    fontSize: 20,
    fontFamily: FontFamily.title
  },
  subTitle: {
    fontSize: 18,
    color: '#2e2e2e'
  }
});

export default HeaderTitleStyles;