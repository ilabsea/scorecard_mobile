import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { smLabelSize } from '../../../constants/mobile_font_size_constant';

const TipStyles = StyleSheet.create({
  title: {
    marginBottom: 0,
    flex: 1,
    fontSize: wp(smLabelSize),
    marginLeft: -8
  },
  viewDetailLabel: {
    fontSize: wp(smLabelSize),
  },
  viewDetailIcon: {
    fontSize: wp('4%'),
  },
  tipIconContainer: {
    width: 50,
  },
  tipIcon: {
    width: 28,
    height: 28,
  }
});

export default TipStyles;