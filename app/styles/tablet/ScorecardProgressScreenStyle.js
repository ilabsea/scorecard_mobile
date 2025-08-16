import { StyleSheet } from 'react-native';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import Color from '../../themes/color';

const ScorecardProgressScreenStyles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 10
  },
  title: {
    fontSize: 24,
    fontFamily: FontFamily.title,
  },
  facilityCode: {
    color: Color.grayColor,
    marginBottom: 6,
    fontFamily: FontFamily.body,
  },
  subTitle: {
    color: 'gray',
    fontFamily: FontFamily.body,
  },
  btn: {
    backgroundColor: Color.headerColor,
    borderRadius: 4,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  btnText: {
    color: Color.whiteColor, 
    fontSize: 20
  },
  btnSubText: {
    color: Color.whiteColor,
    fontSize: 13,
    fontFamily: FontFamily.body,
    marginLeft: 4,
    marginTop: 2,
    color: Color.darkRedColor
  },
  progressBar: {
    height: 30,
    backgroundColor: Color.lightGrayColor,
    marginBottom: 20,
  },
  uploadPercentageLabel: {
    textAlign: 'center',
    zIndex: 1,
    marginTop: 4,
    left: '48%',
    position: 'absolute',
    fontWeight: 'bold',
    fontFamily: FontFamily.body,
  },
  lockIcon: {
    position: 'absolute',
    right: 6,
    color: Color.whiteColor
  }
});

export default ScorecardProgressScreenStyles;