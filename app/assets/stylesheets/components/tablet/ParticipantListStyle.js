import { StyleSheet } from 'react-native';
import { FontFamily } from '../../../../assets/stylesheets/theme/font';

const ParticipantListStyles = StyleSheet.create({
  container: {
    padding: 20,
  },
  itemColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    fontWeight: '700',
    textAlign: 'center',
  },
  orderNumberItem: {
    paddingRight: 20,
    justifyContent: 'center',
    width: 60,
  },
  titleLabel: {
    fontSize: 20,
    fontFamily: FontFamily.title
  },
  participantNumberLabel: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  addParticipantButton: {},
  buttonIconStyle: {},
  buttonLabelStyle: {},
});

export default ParticipantListStyles;