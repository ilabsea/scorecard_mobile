import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../themes/color';
import { bodyFontSize } from '../../utils/font_size_util';

const TipListItemComponentStyles = StyleSheet.create({
  avatarTextSize: wp('8%'),
  titleText: {
    flexShrink: 1,
    fontSize: bodyFontSize()
  },
  subTitleText: {
    color: Color.tipContentBgColor,
    flexShrink: 1,
    fontSize: bodyFontSize()
  }
});

export default TipListItemComponentStyles;