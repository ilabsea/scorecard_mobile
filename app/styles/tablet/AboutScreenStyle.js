import { StyleSheet } from 'react-native';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import Color from '../../themes/color';

const AboutScreenStyles = StyleSheet.create({
  container: {
    backgroundColor: Color.whiteColor,
    flex: 1,
    paddingHorizontal: 22
  },
  title: {
    fontSize: 25,
    fontFamily: FontFamily.title,
    marginTop: 30,
    textAlign: 'center',
  },
  englishTitle: {
    marginTop: 5,
    fontSize: 20
  },
  khmerText: {
    marginTop: 50,
    textAlign: 'center',
  },
  englishText: {
    marginTop: 20,
    textAlign: 'center'
  },
  logoTitle: {
    fontSize: 18,
    fontFamily: FontFamily.body
  },
  logoContainer: {
    marginTop: 40,
    alignItems: 'center'
  },
  euLogo: {
    width: 125,
    height: 125,
    marginBottom: 50,
    marginTop: 10
  },
  implementedLogoContainer: {
    flexDirection: 'row',
    marginTop: 14
  },
  versionText: {
    textAlign: 'center',
    marginTop: 10
  }
});

export default AboutScreenStyles;