import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { smLabelSize, normalLabelSize, iconSize } from '../../../../constants/mobile_font_size_constant';

const TipStyles = StyleSheet.create({
  buttonLabel: {
    fontSize: wp(smLabelSize),
  },
  buttonIcon: {
    fontSize: wp(iconSize)
  }
});

export default TipStyles;