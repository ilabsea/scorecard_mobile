import { StyleSheet } from 'react-native';
import Color from '../../themes/color';
import { bodyFontSize } from '../../utils/font_size_util';

const TipListItemComponentStyles = StyleSheet.create({
  avatarTextSize: 60,
  titleText: {
    flexShrink: 1,
    fontSize: bodyFontSize(),
  },
  subTitleText: {
    color: Color.tipContentBgColor,
    flexShrink: 1,
    fontSize: bodyFontSize(),
  }
});

export default TipListItemComponentStyles;