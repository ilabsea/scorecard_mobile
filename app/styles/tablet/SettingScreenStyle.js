import { StyleSheet } from 'react-native';
import Color from '../../themes/color';
import { bodyFontSize } from '../../utils/font_size_util';

const SettingScreenStyles = StyleSheet.create({
  container: {
    backgroundColor: Color.whiteColor,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  textLabel: {
    fontSize: bodyFontSize()
  },
  messageContainer: {
    marginTop: 100
  }
});

export default SettingScreenStyles;