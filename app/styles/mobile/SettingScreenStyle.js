import { StyleSheet } from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { isShortScreenDevice } from '../../utils/responsive_util';
import Color from '../../themes/color';
import { bodyFontSize, getMobileFontSizeByPixelRatio } from '../../utils/font_size_util';

const SettingScreenStyles = StyleSheet.create({
  container: {
    backgroundColor: Color.whiteColor,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  textLabel: {
    fontSize: bodyFontSize()
  },
  messageContainer: {
    marginTop: isShortScreenDevice() ? hp('1%') : hp('2%'),
    marginBottom: 4,
    fontSize: getMobileFontSizeByPixelRatio(13.5, 13.5),
  }
});

export default SettingScreenStyles;