import { StyleSheet } from 'react-native';
import Color from '../../themes/color';

const TipListItemComponentStyles = StyleSheet.create({
  avatarTextSize: 60,
  titleText: {
    flexShrink: 1,
    fontSize: 16,
  },
  subTitleText: {
    color: Color.tipContentBgColor,
    flexShrink: 1,
    fontSize: 16,
  }
});

export default TipListItemComponentStyles;