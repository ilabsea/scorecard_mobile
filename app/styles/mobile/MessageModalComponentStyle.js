import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const MessageModalComponentStyles = StyleSheet.create({
  container: {
    width: wp('90.5%'),
    padding: 14,
  },
});

export default MessageModalComponentStyles;