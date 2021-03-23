import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { xlLabelSize, lgIconSize } from '../../../constants/mobile_font_size_constant';

const BottomButtonStyles = StyleSheet.create({
  buttonLabel: {
    fontSize: wp(xlLabelSize),
    flex: 1,
    textAlign: 'center',
    color: '#fff'
  },
  buttonIcon: {
    color: '#fff',
    fontSize: wp(lgIconSize),
  }
});

export default BottomButtonStyles;