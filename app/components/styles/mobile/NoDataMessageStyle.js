import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { xlLabelSize } from '../../../constants/mobile_font_size_constant';

const NoDataMessageStyles = StyleSheet.create({
  label: {
    fontSize: wp(xlLabelSize),
    marginVertical: 10
  },
  icon: {
    fontSize: wp('22%'),
    color: "#e1e0e1"
  }
});

export default NoDataMessageStyles;