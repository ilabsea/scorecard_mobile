import { StyleSheet } from 'react-native';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const HeaderTitleComponentStyles = StyleSheet.create({
  headline: {
    color: Color.primaryColor,
    fontSize: 20,
    fontFamily: FontFamily.title
  },
  subTitle: {
    fontSize: 18,
    color: Color.lightBlackColor,
  }
});

export default HeaderTitleComponentStyles;