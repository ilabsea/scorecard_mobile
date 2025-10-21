import { StyleSheet } from 'react-native';
import { bodyFontSize } from '../../utils/font_size_util';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const VotingInfoComponentStyles = StyleSheet.create({
  modalContainer: {
    width: '90%',
  },
  header: {
    fontSize: 18,
    fontFamily: FontFamily.title
  },
  normalText: {
    fontSize: bodyFontSize(),
    fontFamily: FontFamily.body
  }
});

export default VotingInfoComponentStyles;