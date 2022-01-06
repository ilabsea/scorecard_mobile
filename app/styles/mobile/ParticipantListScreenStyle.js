import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { smLabelSize } from '../../constants/mobile_font_size_constant';
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
    fontWeight: '700',
    textAlign: 'center',
    fontSize: wp(smLabelSize),
  },
  actionColumn: {
    width: 50
  }
});

export default PrarticipantListScreenStyles;