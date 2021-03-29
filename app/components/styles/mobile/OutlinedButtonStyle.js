import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { smLabelSize, mdIconSize } from '../../../constants/mobile_font_size_constant';

const OutlinedButtonStyles = StyleSheet.create({
  buttonLabel: {
    fontSize: wp(smLabelSize),
    paddingRight: 0,
  },
  buttonIcon: {
    fontSize: wp(mdIconSize),
    marginLeft: 0,
    marginRight: 0,
  }
});

export default OutlinedButtonStyles;