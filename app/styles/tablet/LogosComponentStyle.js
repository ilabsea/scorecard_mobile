import { StyleSheet } from 'react-native';
import { bodyFontSize } from '../../utils/font_size_util';

const LogosComponentStyles = StyleSheet.create({
  label: {
    fontSize: bodyFontSize()
  },
  euLogo: {
    width: 97,
    height: 87,
    marginBottom: 30,
    marginTop: 10,
  },
  partnerLogoHeight: 44,
});

export default LogosComponentStyles;