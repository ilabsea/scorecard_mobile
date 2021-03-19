import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../../../themes/color';
import { normalLabelSize, iconSize } from '../../../../constants/mobile_font_size_constant';

const ParticipantListItemStyles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 20,
    paddingBottom: 0,
    borderWidth: 0,
  },
  orderNumberColumn: {
    width: wp('11.7%'),
  },
  itemColumn: {
    height: 60,
    alignItems: 'center',
    width: wp('10.5%'),
    padding: 0
  },
  itemValueContainer: {
    paddingTop: 5,
  },
  numberContainer: {
    width: wp('8%'),
    height: wp('8%'),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  numberLabel: {
    fontWeight: '700',
    fontSize: wp('4%'),
    color: 'white',
    margin: 0,
    padding: 0,
    textAlign: 'center',
  },
  emptyLabel: {
    fontSize: 18,
    textAlign: 'center',
  },
  iconStyle: {
    fontSize: wp('5.5%'),
    marginTop: 2,
  },
  ageItem: {
    fontSize: wp('4.4%'),
  },
  editLabel: {
    color: Color.primaryButtonColor,
    fontSize: 13
  },
  participantItem: {
    flexDirection: 'row',
    borderWidth: 0,
    paddingVertical: 16,
    alignItems: 'center',
  },

  genderIcon: {
    paddingHorizontal: 10,
    marginLeft: 16,
    marginTop: wp('0.5%'),
    fontSize: wp(iconSize),
  },
  itemLabel: {
    fontSize: wp(normalLabelSize),
    marginLeft: 10,
  }
});

export default ParticipantListItemStyles;