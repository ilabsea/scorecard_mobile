import { StyleSheet } from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { mdLabelSize } from '../../constants/mobile_font_size_constant';
import { isShortScreenDevice } from '../../utils/responsive_util';
import Color from '../../themes/color';

const SettingScreenStyles = StyleSheet.create({
  container: {
    backgroundColor: Color.whiteColor,
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  textLabel: {
    fontSize: wp(mdLabelSize)
  },
  messageContainer: {
    marginTop: isShortScreenDevice() ? hp('3%') : hp('8%'),
    marginBottom: 4,
    fontSize: 14.2,
  }
});

export default SettingScreenStyles;