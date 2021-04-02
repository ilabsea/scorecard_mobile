import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
// import { mdLabelSize, smLabelSize } from '../../../../constants/mobile_font_size_constant';

const TipListItemStyles = StyleSheet.create({
  avatarTextSize: wp('8%'),
  titleText: {
    flexShrink: 1,
    fontSize: wp('3.6%')
  },
  subTitleText: {
    color: '#858796',
    flexShrink: 1,
    fontSize: wp('3.6%'),
  }
});

export default TipListItemStyles;