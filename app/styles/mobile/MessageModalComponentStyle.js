import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const MessageModalComponentStyles = StyleSheet.create({
  container: {
    width: wp('87%'),
    padding: 18,
  },
});

export default MessageModalComponentStyles;