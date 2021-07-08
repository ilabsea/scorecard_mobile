import { StyleSheet } from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { mdLabelSize } from '../../constants/mobile_font_size_constant';
import { isShortScreenDevice } from '../../utils/responsive_util';

const SettingScreenStyles = StyleSheet.create({
  textLabel: {
    fontSize: wp(mdLabelSize)
  },
  messageContainer: {
    marginTop: isShortScreenDevice() ? hp('3%') : hp('9%'),
    marginBottom: 4
  }
});

export default SettingScreenStyles;