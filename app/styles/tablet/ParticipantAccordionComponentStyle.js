import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const labelFontSize = 16;

const ParticipantAccordionComponentStyles = StyleSheet.create({
  accordionItemContainer: {
    flexDirection: 'row',
    width: wp('71%'),
  },
  titleText: {
    fontSize: labelFontSize,
    marginTop: 5,
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
  genderIconContainer: {
    width: 30,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ParticipantAccordionComponentStyles;