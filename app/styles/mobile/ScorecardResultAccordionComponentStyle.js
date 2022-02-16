import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { smLabelSize } from '../../constants/mobile_font_size_constant';
import Color from '../../themes/color';
import { bodyFontSize, accordionItemFontSize, getMobileFontSizeByPixelRatio } from '../../utils/font_size_util';

const ScorecardResultAccordionComponentStyles = StyleSheet.create({
  titleText: {
    fontSize: bodyFontSize(),
  },
  itemTitleText: {
    fontSize: accordionItemFontSize(),
    flex: 3,
    alignSelf: 'center',
  },
  itemValueText: {
    fontSize: bodyFontSize(),
    flex: 1,
    textAlign: 'center',
  },
  btn: {
    width: '100%',
    maxWidth: 90,
    height: 34,
    backgroundColor: '#cacaca',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  btnText: {
    fontSize: getMobileFontSizeByPixelRatio(13, 12),
  },
  btnEdit: {
    backgroundColor: Color.headerColor,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  btnEditText: {
    color: Color.whiteColor,
    marginRight: 6,
    fontSize: accordionItemFontSize(),
  },
  btnEditIcon: {
    color: Color.whiteColor,
    fontSize: wp('2.5%'),
  },
  warningLabel: {
    fontSize: wp(smLabelSize),
    color: Color.redColor,
    textAlign: 'right'
  }
});

export default ScorecardResultAccordionComponentStyles;