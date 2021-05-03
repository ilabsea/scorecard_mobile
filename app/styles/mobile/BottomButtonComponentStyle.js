import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { lgLabelSize, mdLabelSize, lgIconSize, mdIconSize } from '../../constants/mobile_font_size_constant';
import { isShortScreenDevice } from '../../utils/responsive_util';
import Color from '../../themes/color';

const BottomButtonComponentStyles = StyleSheet.create({
  buttonLabel: {
    fontSize: isShortScreenDevice() ? wp(mdLabelSize) : wp(lgLabelSize),
    flex: 1,
    textAlign: 'center',
    color: Color.whiteColor
  },
  buttonIcon: {
    color: Color.whiteColor,
    fontSize: isShortScreenDevice() ? wp(mdIconSize) : wp(lgIconSize),
  },
  buttonContainer: {
    height: isShortScreenDevice() ? 45 : 50,
  }
});

export default BottomButtonComponentStyles;