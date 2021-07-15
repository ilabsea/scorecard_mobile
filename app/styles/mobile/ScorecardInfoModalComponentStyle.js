import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { modalBorderRadius } from '../../constants/border_radius_constant';

const ErrorMessageModalComponentStyles = StyleSheet.create({
  container: {
    width: wp('94%'),
    padding: 14,
    borderRadius: modalBorderRadius
  },
});

export default ErrorMessageModalComponentStyles;