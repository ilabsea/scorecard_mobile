import { StyleSheet } from 'react-native';
import { FontFamily } from '../../../assets/stylesheets/theme/font';

const ScorecardItemStyles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
    marginTop: -5,
  },
  subTitle: {
    fontFamily: FontFamily.title,
    marginBottom: 8,
    flex: 1
  },
  viewDetailContainer: {
    height: 48
  },
  viewDetailLabel: {
    fontSize: 16
  },
  viewDetailIcon: {
    fontSize: 24
  },
  statusIcon: {
    fontSize: 50,
    color: '#fff'
  },
  lockIcon: {
    fontSize: 28,
  },
  swipeableContainer: {
    backgroundColor: '#fff',
    maxHeight: 155,
    marginBottom: 20,
  },
  deleteContainer: {
    backgroundColor: 'red',
    maxHeight: 153,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteLabel: {
    fontSize: 16
  }
});

export default ScorecardItemStyles;