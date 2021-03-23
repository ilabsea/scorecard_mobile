import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { xxlLabelSize, xlLabelSize, smLabelSize } from '../../../../constants/mobile_font_size_constant';
import { FontFamily } from '../../../../assets/stylesheets/theme/font';

const PrarticipantListStyles = StyleSheet.create({
  titleLabel: {
    fontSize: wp(xlLabelSize),
    fontFamily: FontFamily.title
  },
  participantNumberLabel: {
    fontSize: wp(xxlLabelSize),
    fontWeight: 'bold',
    marginLeft: 5,
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
});

export default PrarticipantListStyles;