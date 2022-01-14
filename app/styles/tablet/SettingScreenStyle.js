import { StyleSheet } from 'react-native';
import Color from '../../themes/color';

const SettingScreenStyles = StyleSheet.create({
  container: {
    backgroundColor: Color.whiteColor,
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  textLabel: {
    fontSize: 16
  },
  messageContainer: {
    marginTop: 120
  }
});

export default SettingScreenStyles;