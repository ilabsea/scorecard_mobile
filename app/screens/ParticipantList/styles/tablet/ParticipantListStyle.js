import { StyleSheet } from 'react-native';
import { FontFamily } from '../../../../assets/stylesheets/theme/font';

const PrarticipantListStyles = StyleSheet.create({
  titleLabel: {
    fontSize: 20,
    fontFamily: FontFamily.title
  },
  participantNumberLabel: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 5,
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
});

export default PrarticipantListStyles;