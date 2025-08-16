import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../themes/color';
import { bodyFontSize } from '../../utils/font_size_util';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const TipListItemComponentStyles = StyleSheet.create({
  avatarTextSize: wp('8%'),
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