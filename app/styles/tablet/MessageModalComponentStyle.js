import { StyleSheet } from 'react-native';
import { modalBorderRadius } from '../../constants/border_radius_constant';

const MessageModalComponentStyles = StyleSheet.create({
  container: {
    width: '68%',
    borderRadius: modalBorderRadius
  },
});

export default MessageModalComponentStyles;