import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { xlLabelSize, lgLabelSize, smLabelSize } from '../../../constants/mobile_font_size_constant';
import Color from '../../../themes/color';
import { FontFamily } from '../../../assets/stylesheets/theme/font';
import { isShortScreenDevice } from '../../../utils/responsive_util';

const HeaderTitleStyles = StyleSheet.create({
  headline: {
    color: Color.primaryColor,
    fontSize: isShortScreenDevice() ? wp(lgLabelSize) : wp(xlLabelSize),
    fontFamily: FontFamily.title
  },
  subTitle: {
    fontSize: isShortScreenDevice() ? wp(smLabelSize) : wp(lgLabelSize),
    color: '#2e2e2e'
  }
});

export default HeaderTitleStyles;