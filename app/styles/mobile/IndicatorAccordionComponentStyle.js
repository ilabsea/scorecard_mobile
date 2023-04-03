import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../themes/color';
import { xsLabelSize, smLabelSize } from '../../constants/mobile_font_size_constant';
import { isShortWidthScreen } from '../../utils/responsive_util';
import { getMobileFontSizeByPixelRatio } from '../../utils/font_size_util';

const titleFontSize = getMobileFontSizeByPixelRatio(14.2, 15);

const IndicatorAccordionComponentStyles = StyleSheet.create({
  accordionItemContainer: {
    width: isShortWidthScreen() ? wp('71%') : wp('73%'),
    height: wp('12.5%'),
    justifyContent: 'center',
  },
  titleLabel: {
    fontSize: titleFontSize
  },
  subTitleLabel: {
    // fontSize: wp(xsLabelSize),
    fontSize: wp(smLabelSize),
    color: Color.grayColor,
    marginTop: 2
  },
  contentContainer: {
    flexDirection: 'row',
    backgroundColor: Color.accordionContentBgColor,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 5,
  },
  contentTitleLabel: {
    fontSize: titleFontSize,
    marginTop: -1
  },
});

export default IndicatorAccordionComponentStyles;