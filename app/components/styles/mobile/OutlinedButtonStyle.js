import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { mdLabelSize, mdIconSize } from '../../../constants/mobile_font_size_constant';

const OutlinedButtonStyles = StyleSheet.create({
  formContainer: {
    width: '65%',
    maxWidth: 360,
    marginTop: 20,
  },
  buttonLabel: {
    fontSize: wp(mdLabelSize),
    paddingRight: 0,
  },
  buttonIcon: {
    fontSize: wp(mdIconSize),
    marginLeft: 0,
  }
});

export default OutlinedButtonStyles;