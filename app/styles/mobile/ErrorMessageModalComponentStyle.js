import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const ErrorMessageModalComponentStyles = StyleSheet.create({
  container: {
    width: wp('87%'),
    padding: 18,
  },
});

export default ErrorMessageModalComponentStyles;