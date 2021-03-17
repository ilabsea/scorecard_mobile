import { StyleSheet } from 'react-native';
import {
  getResponsiveSize,
  getBigButtonWidth,
  getBigButtonHeight,
} from '../../../utils/responsive_util';

const BigButtonStyles = StyleSheet.create({
  button: {
    backgroundColor: '#003b5c',
    flexDirection: 'row',
    height: getBigButtonHeight(),
    width: getBigButtonWidth(),
    maxWidth: 360,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20
  },
  icon: {
    color: '#fff',
    fontSize: getResponsiveSize(48, 38),
    marginLeft: 24,
    marginRight: getResponsiveSize(40, 24),
  },
  label: {
    color: '#fff',
    fontSize: getResponsiveSize(20, 16),
  }
});

export default BigButtonStyles;