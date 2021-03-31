import { StyleSheet } from 'react-native';
import { FontFamily } from '../../../../assets/stylesheets/theme/font';
import Color from '../../../../themes/color';

const ScorecardProgressStyles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    fontSize: 24,
    fontFamily: FontFamily.title,
    lineHeight: 40,
    marginBottom: 16
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
    color: '#fff', 
    fontSize: 20
  },
  progressBar: {
    height: 30,
    backgroundColor: '#e6e7e9',
    marginBottom: 20,
  },
  uploadPercentageLabel: {
    textAlign: 'center',
    zIndex: 1,
    marginTop: 4,
    left: '48%',
    position: 'absolute',
    fontWeight: 'bold',
  },
  lockIcon: {
    position: 'absolute',
    right: 6,
    color: '#fff'
  }
});

export default ScorecardProgressStyles;