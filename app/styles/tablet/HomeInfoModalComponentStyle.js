import { StyleSheet } from 'react-native';
import Color from '../../themes/color';
import { modalBorderRadius } from '../../constants/border_radius_constant';

const homeInfoModalStyles = StyleSheet.create({
  modalContentContainer: {
    width: '65%',
  },
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
  }
});

export default homeInfoModalStyles;