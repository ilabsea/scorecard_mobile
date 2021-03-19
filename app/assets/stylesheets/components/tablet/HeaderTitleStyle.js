import { StyleSheet } from 'react-native';
import { FontFamily } from '../../theme/font';
import Color from '../../../../themes/color';

const HeaderTitleStyles = StyleSheet.create({
  headline: {
    color: Color.primaryColor,
    fontSize: 20,
    fontFamily: FontFamily.title
  },
  subTitle: {
    fontSize: 18,
    color: '#2e2e2e',
  }
});

export default HeaderTitleStyles;