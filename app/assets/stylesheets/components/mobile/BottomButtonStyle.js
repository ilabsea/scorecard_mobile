import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { titleSize } from '../../../../constants/mobile_font_size_constant';

const BottomButtonStyles = StyleSheet.create({
  labelStyle: {
    fontSize: wp(titleSize),
    flex: 1,
    textAlign: 'center',
    color: '#fff'
  },
});

export default BottomButtonStyles;