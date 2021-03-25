import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { modalHeadingTitleSize } from '../../../utils/responsive_util';
import { mdLabelSize } from '../../../constants/mobile_font_size_constant';

const PopupModalStyles = StyleSheet.create({
  headerTitle: {
    fontSize: modalHeadingTitleSize(),
    marginBottom: 15,
  },
  label: {
    fontSize: wp(mdLabelSize),
  }
});

export default PopupModalStyles;