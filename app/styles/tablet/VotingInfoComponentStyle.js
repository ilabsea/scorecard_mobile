import { StyleSheet } from 'react-native';
import { bodyFontSize } from '../../utils/font_size_util';

const VotingInfoComponentStyles = StyleSheet.create({
  modalContainer: {
    width: '90%',
  },
  header: {
    fontSize: 18,
  },
  normalText: {
    fontSize: bodyFontSize()
  }
});

export default VotingInfoComponentStyles;