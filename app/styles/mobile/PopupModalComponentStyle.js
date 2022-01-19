import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { modalHeadingTitleSize } from '../../utils/responsive_util';
import { mdLabelSize } from '../../constants/mobile_font_size_constant';

const PopupModalComponentStyles = StyleSheet.create({
  headerTitle: {
    fontSize: modalHeadingTitleSize(),
    marginBottom: 0,
  },
  label: {
    fontSize: 14.2,
  }
});

export default PopupModalComponentStyles;