import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../themes/color';

const TipListItemComponentStyles = StyleSheet.create({
  avatarTextSize: wp('8%'),
  titleText: {
    flexShrink: 1,
    fontSize: wp('3.6%')
  },
  subTitleText: {
    color: Color.tipContentBgColor,
    flexShrink: 1,
    fontSize: wp('3.6%'),
  }
});

export default TipListItemComponentStyles;