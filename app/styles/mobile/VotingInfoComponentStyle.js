import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { bodyFontSize } from '../../utils/font_size_util';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const VotingInfoComponentStyles = StyleSheet.create({
  modalContainer: {
    width: wp('90%'),
    padding: 14,
  },
  header: {
    fontSize: bodyFontSize(),
    fontFamily: FontFamily.title
  },
  normalText: {
    fontSize: bodyFontSize(),
    fontFamily: FontFamily.body
  }
});

export default VotingInfoComponentStyles;