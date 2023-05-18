import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { smLabelSize } from '../../constants/mobile_font_size_constant';
import Color from '../../themes/color';
import {FontFamily} from '../../assets/stylesheets/theme/font';
import { bodyFontSize, accordionItemFontSize, getMobileFontSizeByPixelRatio } from '../../utils/font_size_util';

const ScorecardResultAccordionComponentStyles = StyleSheet.create({
  titleText: {
    fontSize: bodyFontSize(),
  },
  itemTitleText: {
    fontSize: accordionItemFontSize(),
  },
  itemSubtitleText: {
    color: Color.lightGrayColor,
    fontSize: 12
  },
  itemValueText: {
    fontSize: bodyFontSize(),
    flex: 1,
    textAlign: 'right',
  },
  pressableText: {
    color: Color.clickableColor,
    fontFamily: FontFamily.title,
    fontSize: getMobileFontSizeByPixelRatio(13, 12),
  },
  warningLabel: {
    fontSize: wp(smLabelSize),
    color: Color.redColor,
    textAlign: 'right'
  }
});

export default ScorecardResultAccordionComponentStyles;