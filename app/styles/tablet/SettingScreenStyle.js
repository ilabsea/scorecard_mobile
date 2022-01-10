import { StyleSheet } from 'react-native';
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
    marginTop: 120
  }
});

export default SettingScreenStyles;