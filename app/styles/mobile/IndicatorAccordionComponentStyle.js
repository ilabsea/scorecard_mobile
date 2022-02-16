import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../themes/color';
import { smLabelSize, xsLabelSize } from '../../constants/mobile_font_size_constant';
import { isShortWidthScreen } from '../../utils/responsive_util';

const IndicatorAccordionComponentStyles = StyleSheet.create({
  accordionItemContainer: {
    width: isShortWidthScreen() ? wp('71%') : wp('73%'),
    height: wp('12.5%'),
    justifyContent: 'center',
  },
  titleLabel: {
    fontSize: wp(smLabelSize)
  },
  subTitleLabel: {
    fontSize: wp(xsLabelSize),
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
    fontSize: wp(smLabelSize),
    marginTop: -1
  },
});

export default IndicatorAccordionComponentStyles;