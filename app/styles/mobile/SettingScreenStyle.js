import { StyleSheet } from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { mdLabelSize } from '../../constants/mobile_font_size_constant';

const SettingScreenStyles = StyleSheet.create({
  textLabel: {
    fontSize: wp(mdLabelSize)
  },
  messageContainer: {
    marginTop: hp('9%')
  }
});

export default SettingScreenStyles;