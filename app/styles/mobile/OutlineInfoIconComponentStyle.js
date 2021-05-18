import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { xlIconSize } from '../../constants/mobile_font_size_constant';

const OutlineInfoIconComponentStyles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: wp(xlIconSize),
  }
});

export default OutlineInfoIconComponentStyles;