import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { isShortScreenDevice } from '../../../../utils/responsive_util';
import { lgLabelSize, mdLabelSize, lgIconSize } from '../../../../constants/mobile_font_size_constant';

const DownloadButtonStyles = StyleSheet.create({
  buttonLabel: {
    fontSize: isShortScreenDevice() ? wp(mdLabelSize) : wp(lgLabelSize),
  },
  progressBar: {
    height: 20,
    marginBottom: 15,
  },
  downloadPercentageLabel: {
    fontSize: wp('3.5%')
  },
  icon: {
    fontSize: wp(lgIconSize),
  },
  button: {
    height: isShortScreenDevice() ? 45 : 50,
  }
});

export default DownloadButtonStyles;