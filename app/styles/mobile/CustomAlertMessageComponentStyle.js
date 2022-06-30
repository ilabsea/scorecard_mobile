import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { modalBorderRadius } from '../../constants/border_radius_constant';

const CustomAlertMessageComponentStyles = StyleSheet.create({
  container: {
    width: wp('80%'),
    padding: 14,
    borderRadius: modalBorderRadius
  },
});

export default CustomAlertMessageComponentStyles;