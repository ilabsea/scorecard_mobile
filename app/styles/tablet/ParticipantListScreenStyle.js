import { StyleSheet } from 'react-native';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { bigTitleFontSize } from '../../utils/font_size_util';

const PrarticipantListScreenStyles = StyleSheet.create({
  titleLabel: {
    fontSize: bigTitleFontSize(),
    fontFamily: FontFamily.title
  },
  participantNumberLabel: {
    fontSize: bigTitleFontSize(),
    fontFamily: FontFamily.title,
    marginLeft: 5,
  },
  orderNumberHeaderContainer: {
    paddingRight: 20,
    justifyContent: 'center',
    width: 60
  },
  itemTitle: {
    textAlign: 'center',
    fontFamily: FontFamily.title,
    lineHeight: 28,
    fontSize: 15,
  },
  actionColumn: {
    width: 60
  }
});

export default PrarticipantListScreenStyles;