import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { xxlLabelSize, xlLabelSize, lgLabelSize, mdLabelSize } from '../../constants/mobile_font_size_constant';
import Color from '../../themes/color';

const AboutScreenStyles = StyleSheet.create({
  container: {
    backgroundColor: Color.whiteColor,
    flex: 1,
    paddingHorizontal: 18,
  },
  title: {
    fontSize: wp(xxlLabelSize),
    fontFamily: FontFamily.title,
    marginTop: 20,
    textAlign: 'center',
  },
  englishTitle: {
    marginTop: 5,
    fontSize: wp(xlLabelSize)
  },
  khmerText: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: wp(mdLabelSize),
  },
  englishText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: wp(mdLabelSize)
  },
  logoTitle: {
    fontSize: wp(lgLabelSize),
    fontFamily: FontFamily.body,
  },
  logoContainer: {
    marginTop: 30,
    alignItems: 'center'
  },
  euLogo: {
    width: wp('26%'),
    height: wp('23%'),
    marginBottom: 30,
    marginTop: 10
  },
  implementedLogoContainer: {
    flexDirection: 'row',
    marginTop: -5,
  },
  versionText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: wp(mdLabelSize)
  }
});

export default AboutScreenStyles;