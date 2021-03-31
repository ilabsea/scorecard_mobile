import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { lgLabelSize, mdLabelSize, smLabelSize } from '../../../../constants/mobile_font_size_constant';

const VotingInfoStyles = StyleSheet.create({
  modalContainer: {
    width: wp('90%'),
    padding: 18,
  },
  header: {
    fontSize: wp(lgLabelSize),
  },
  participantTypeText: {
    fontSize: wp(smLabelSize),
  },
  participantNumberText: {
    fontSize: wp(mdLabelSize),
    fontWeight: 'bold',
  },
  normalText: {
    fontSize: wp(mdLabelSize)
  }
});

export default VotingInfoStyles;