import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { lgLabelSize, mdLabelSize, lgIconSize, mdIconSize } from '../../../constants/mobile_font_size_constant';
import { isShortScreenDevice } from '../../../utils/responsive_util';

const BottomButtonStyles = StyleSheet.create({
  buttonLabel: {
    fontSize: isShortScreenDevice() ? wp(mdLabelSize) : wp(lgLabelSize),
    flex: 1,
    textAlign: 'center',
    color: '#fff'
  },
  buttonIcon: {
    color: '#fff',
    fontSize: isShortScreenDevice() ? wp(mdIconSize) : wp(lgIconSize),
  },
  buttonContainer: {
    height: isShortScreenDevice() ? 45 : 50,
  }
});

export default BottomButtonStyles;