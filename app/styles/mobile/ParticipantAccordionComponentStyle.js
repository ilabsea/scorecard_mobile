import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { xsLabelSize } from '../../constants/mobile_font_size_constant';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { getMobileFontSizeByPixelRatio } from '../../utils/font_size_util';

const labelFontSize = getMobileFontSizeByPixelRatio(14.2, 13);

const ParticipantAccordionComponentStyles = StyleSheet.create({
  accordionItemContainer: {
    flexDirection: 'row',
    width: wp('71%'),
  },
  titleText: {
    fontSize: labelFontSize,
    marginTop: 4,
    marginHorizontal: 5
  },
  itemTitleText: {
    fontSize: labelFontSize,
    flex: 1,
    fontFamily: FontFamily.title
  },
  itemValueText: {
    fontSize: labelFontSize,
    flex: 1,
  },
  editButton: {
    fontSize: labelFontSize,
    color: Color.clickableColor,
  },
  btnEditIcon: {
    color: Color.clickableColor,
    fontSize: wp(xsLabelSize),
    marginRight: 5,
    alignSelf: 'center',
    marginTop: -2
  },
  genderIconContainer: {
    // width: 30,
    // marginLeft: 5,
    width: 45,
    marginRight: -5,
    marginLeft: 2,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ParticipantAccordionComponentStyles;