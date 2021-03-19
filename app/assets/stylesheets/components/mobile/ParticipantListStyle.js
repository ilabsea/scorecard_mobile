import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { FontFamily } from '../../../../assets/stylesheets/theme/font';

const ParticipantListStyles = StyleSheet.create({
  container: {
    padding: 20,
  },
  itemColumn: {
    width: wp('10.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0
  },
  itemTitle: {
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 12
  },
  orderNumberItem: {
    paddingRight: 20,
    justifyContent: 'center',
    width: wp('11.7%'),
  },
  titleLabel: {
    fontSize: 18,
    fontFamily: FontFamily.title
  },
  participantNumberLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  addParticipantButton: {
    width: wp('40%')
  },
  buttonIconStyle: {
    fontSize: 20,
  },
  buttonLabelStyle: {
    fontSize: wp('3.5%'),
    paddingLeft: 0,
  },
});

export default ParticipantListStyles;