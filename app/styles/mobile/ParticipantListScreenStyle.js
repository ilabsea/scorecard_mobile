import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { bigTitleFontSize } from '../../utils/font_size_util';

const PrarticipantListScreenStyles = StyleSheet.create({
  titleLabel: {
    fontSize: bigTitleFontSize(),
    fontFamily: FontFamily.title
  },
  participantNumberLabel: {
    fontSize: bigTitleFontSize(),
    fontWeight: 'bold',
    marginLeft: 5,
    marginTop: 3,
  },
  orderNumberHeaderContainer: {
    paddingRight: 20,
    justifyContent: 'center',
    width: wp('11.7%'),
  },
  itemTitle: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: FontFamily.title,
    lineHeight: 19,
    paddingTop: 1
  },
  actionColumn: {
    width: 50
  }
});

export default PrarticipantListScreenStyles;