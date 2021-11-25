import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../themes/color';
import { modalBorderRadius } from '../../constants/border_radius_constant';

const homeInfoMessageModalStyles = StyleSheet.create({
  modalContentContainer: {
    width: wp('90.5%'),
    padding: 14,
  },
  loadingContainer: {
    backgroundColor: Color.whiteColor,
    maxWidth: '80%',
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