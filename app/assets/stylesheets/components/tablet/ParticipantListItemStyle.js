import { StyleSheet } from 'react-native';
import Color from '../../../../themes/color';

const ParticipantListItemStyles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 20,
    paddingBottom: 5,
    borderWidth: 0,
  },
  orderNumberColumn: {
    borderWidth: 0,
    width: 60,
  },
  itemColumn: {
    flex: 1,
    height: 60,
    alignItems: 'center',
  },
  itemValueContainer: {
    paddingTop: 10,
  },
  numberContainer: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  numberLabel: {
    fontWeight: '700',
    fontSize: 18,
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
    fontSize: 25,
  },
  ageItem: {
    fontSize: 18,
  },
  editLabel: {
    color: Color.primaryButtonColor
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
    fontSize: 25,
  },
  itemLabel: {
    fontSize: 16,
    marginLeft: 10,
  }
});

export default ParticipantListItemStyles;