import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../themes/color';

const labelFontSize = 16;

const CriteriaAccordionComponentStyles = StyleSheet.create({
  accordionItemContainer: {
    width: wp('73%'),
    height: wp('8.8%'),
    justifyContent: 'center',
  },
  titleLabel: {
    fontSize: labelFontSize
  },
  subTitleLabel: {
    fontSize: 14,
    color: Color.grayColor,
    marginTop: 2
  },
  contentContainer: {
    flexDirection: 'row',
    backgroundColor: Color.accordionContentBgColor,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 8
  },
  contentTitleLabel: {
    fontSize: labelFontSize,
    marginTop: 2
  },
});

export default CriteriaAccordionComponentStyles;