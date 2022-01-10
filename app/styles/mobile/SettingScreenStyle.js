import { StyleSheet } from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { isShortScreenDevice } from '../../utils/responsive_util';
import Color from '../../themes/color';
import { bodyFontSize } from '../../utils/font_size_util';

const SettingScreenStyles = StyleSheet.create({
  container: {
    backgroundColor: Color.whiteColor,
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  textLabel: {
    fontSize: bodyFontSize()
  },
  messageContainer: {
    marginTop: isShortScreenDevice() ? hp('3%') : hp('8%'),
    marginBottom: 4,
    fontSize: 14.2,
  }
});

export default SettingScreenStyles;