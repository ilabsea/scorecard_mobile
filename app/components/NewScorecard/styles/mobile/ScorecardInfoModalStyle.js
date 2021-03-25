import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const ErrorMessageModalStyles = StyleSheet.create({
  container: {
    width: wp('85%'),
    padding: 18,
  },
});

export default ErrorMessageModalStyles;