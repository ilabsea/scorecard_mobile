import { StyleSheet } from 'react-native';
import { modalBorderRadius } from '../../constants/border_radius_constant';

const ErrorMessageModalComponentStyles = StyleSheet.create({
  container: {
    width: '65%',
    borderRadius: modalBorderRadius
  },
});

export default ErrorMessageModalComponentStyles;