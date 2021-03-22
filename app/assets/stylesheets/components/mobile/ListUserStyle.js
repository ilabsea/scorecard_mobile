import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { titleSize } from '../../../../constants/mobile_font_size_constant';
import { FontFamily } from '../../theme/font';

const ListUserStyles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  headingTitle: {
    fontSize: wp(titleSize),
    fontFamily: FontFamily.title,
    color: '#22354c',
  },
});

export default ListUserStyles;