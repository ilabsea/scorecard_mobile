import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { bodyFontSize } from '../../utils/font_size_util';

const labelFontSize = bodyFontSize();

const ParticipantAccordionComponentStyles = StyleSheet.create({
  accordionItemContainer: {
    flexDirection: 'row',
    width: wp('80%'),
    alignItems: 'center',
  },
  titleText: {
    fontSize: labelFontSize,
    marginHorizontal: 8
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
    fontSize: labelFontSize,
    marginRight: 5,
    alignSelf: 'center',
    marginTop: -2
  },
});

export default ParticipantAccordionComponentStyles;