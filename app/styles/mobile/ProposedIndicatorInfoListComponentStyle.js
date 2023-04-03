import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../themes/color';
import { smLabelSize } from '../../constants/mobile_font_size_constant';
import { isShortWidthScreen, isSmallMobileScreenDevice } from '../../utils/responsive_util';
import { getMobileFontSizeByPixelRatio } from '../../utils/font_size_util';

const ProposedIndicatorInfoListComponentStyles = StyleSheet.create({
  container: {
    height: isSmallMobileScreenDevice() ? 90 : 95,
    marginTop: 10,
    paddingHorizontal: 14
  },
  label: {
    fontSize: getMobileFontSizeByPixelRatio(14.2, 15)
  },
  subLabel: {
    fontSize: wp(smLabelSize),
  }
});

export default ProposedIndicatorInfoListComponentStyles;