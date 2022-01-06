import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { bodyFontSize } from '../../utils/font_size_util';

const VotingInfoComponentStyles = StyleSheet.create({
  modalContainer: {
    width: wp('90%'),
    padding: 14,
  },
  header: {
    fontSize: bodyFontSize()
  },
  normalText: {
    fontSize: bodyFontSize()
  }
});

export default VotingInfoComponentStyles;