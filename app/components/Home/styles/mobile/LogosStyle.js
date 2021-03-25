import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { mdLabelSize } from '../../../../constants/mobile_font_size_constant';

const LogosStyles = StyleSheet.create({
  label: {
    fontSize: wp(mdLabelSize)
  },
  euLogo: {
    width: wp('24.2%'),
    height: wp('21.2%'),
    marginBottom: 30,
    marginTop: 10,
  },
  partnerLogoHeight: wp('7.5%'),
});

export default LogosStyles;