import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { isShortScreenDevice } from '../../utils/responsive_util';
import { bodyFontSize } from '../../utils/font_size_util';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const LogosComponentStyles = StyleSheet.create({
  label: {
    fontFamily: FontFamily.body,
    fontSize: bodyFontSize()
  },
  euLogo: {
    width: wp('24.2%'),
    height: wp('21.2%'),
    marginBottom: isShortScreenDevice() ? 20 : 30,
    marginTop: 10,
  },
  partnerLogoHeight: wp('7.5%'),
});

export default LogosComponentStyles;