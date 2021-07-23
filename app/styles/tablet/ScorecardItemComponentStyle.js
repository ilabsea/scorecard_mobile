import { StyleSheet } from 'react-native';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import Color from '../../themes/color';

const ScorecardItemComponentStyles = StyleSheet.create({
  itemContainer: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: Color.whiteColor,
    borderBottomWidth: 0.5,
    borderBottomColor: Color.paleGrayColor,
  },
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
    color: Color.whiteColor
  },
  lockIcon: {
    fontSize: 28,
  },
  deleteContainer: {
    backgroundColor: Color.redColor,
    maxHeight: 157,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteLabel: {
    fontSize: 16
  }
});

export default ScorecardItemComponentStyles;