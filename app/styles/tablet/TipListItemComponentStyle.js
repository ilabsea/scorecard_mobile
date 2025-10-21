import { StyleSheet } from 'react-native';
import Color from '../../themes/color';
import { bodyFontSize } from '../../utils/font_size_util';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const TipListItemComponentStyles = StyleSheet.create({
  avatarTextSize: 60,
  titleText: {
    flexShrink: 1,
    fontSize: bodyFontSize(),
    fontFamily: FontFamily.body,
  },
  subTitleText: {
    color: Color.tipContentBgColor,
    flexShrink: 1,
    fontSize: bodyFontSize(),
    fontFamily: FontFamily.body,
  }
});

export default TipListItemComponentStyles;