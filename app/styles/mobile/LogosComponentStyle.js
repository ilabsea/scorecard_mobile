import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { mdLabelSize, smLabelSize } from '../../constants/mobile_font_size_constant';
import { isShortScreenDevice } from '../../utils/responsive_util';

const LogosComponentStyles = StyleSheet.create({
  label: {
    fontSize: isShortScreenDevice() ? wp(smLabelSize) : wp(mdLabelSize)
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