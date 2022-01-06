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
    fontWeight: 'bold',
    marginLeft: 5,
    marginTop: 3
  },
  orderNumberHeaderContainer: {
    paddingRight: 20,
    justifyContent: 'center',
    width: 60
  },
  itemTitle: {
    fontWeight: '700',
    textAlign: 'center',
  },
  actionColumn: {
    width: 60
  }
});

export default PrarticipantListScreenStyles;