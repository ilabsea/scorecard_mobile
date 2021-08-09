import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { smLabelSize, xsLabelSize } from '../../constants/mobile_font_size_constant';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { isShortWidthScreen } from '../../utils/responsive_util';

const ParticipantAccordionComponentStyles = StyleSheet.create({
  accordionItemContainer: {
    flexDirection: 'row',
    width: isShortWidthScreen() ? wp('71%') : wp('75%')
  },
  titleText: {
    fontSize: wp(smLabelSize),
    marginTop: 4,
    marginHorizontal: 5
  },
  itemTitleText: {
    fontSize: wp(smLabelSize),
    flex: 1,
    fontFamily: FontFamily.title
  },
  itemValueText: {
    fontSize: wp(smLabelSize),
    flex: 1,
  },
  editButton: {
    fontSize: wp(smLabelSize),
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
    width: 30,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ParticipantAccordionComponentStyles;