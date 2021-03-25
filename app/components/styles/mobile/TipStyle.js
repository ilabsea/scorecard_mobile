import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { lgLabelSize, mdLabelSize, mdIconSize } from '../../../constants/mobile_font_size_constant';
import { isShortScreenDevice } from '../../../utils/responsive_util';

const TipStyles = StyleSheet.create({
  title: {
    marginBottom: 0,
    flex: 1,
    fontSize: isShortScreenDevice() ? wp(mdLabelSize) : wp(lgLabelSize),
  },
  viewDetailLabel: {
    fontSize: wp(mdLabelSize),
  },
  viewDetailIcon: {
    fontSize: wp(mdIconSize),
  }
});

export default TipStyles;