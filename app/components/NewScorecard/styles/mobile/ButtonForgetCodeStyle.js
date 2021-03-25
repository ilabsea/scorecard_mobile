import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { mdIconSize, mdLabelSize } from '../../../../constants/mobile_font_size_constant';
import { isShortScreenDevice } from '../../../../utils/responsive_util';

const ButtonForgetCodeStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: isShortScreenDevice() ? 10 : 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: isShortScreenDevice() ? 0 : 10,
    marginBottom: isShortScreenDevice() ? -10 : 0,
  },
  icon: {
    color: '#fff',
    fontSize: wp('5.2%'),
  },
  label: {
    fontSize: wp(mdLabelSize),
  }
});

export default ButtonForgetCodeStyles;