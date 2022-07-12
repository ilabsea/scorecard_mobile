import { StyleSheet } from 'react-native';
import Color from '../../themes/color';
import { modalBorderRadius } from '../../constants/border_radius_constant';

const homeInfoMessageModalStyles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    backgroundColor: Color.whiteColor,
    maxWidth: '55%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: modalBorderRadius
  },
  loadingContentWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default homeInfoMessageModalStyles;