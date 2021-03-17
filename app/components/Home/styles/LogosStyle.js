import { StyleSheet } from 'react-native';
import { getResponsiveSize } from '../../../utils/responsive_util';

const LogosStyles = StyleSheet.create({
  fundedByLogo: {
    width: getResponsiveSize(97, 87),
    height: getResponsiveSize(87, 77),
    marginBottom: 30,
    marginTop: 10,
  }
});

export default LogosStyles;