import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../themes/color';
import { smLabelSize } from '../../constants/mobile_font_size_constant';

const CriteriaAccordionComponentStyles = StyleSheet.create({
  titleLabel: {
    fontSize: 14
  },
  subTitleLabel: {
    fontSize: 12,
    color: Color.grayColor,
    marginTop: 2
  },
  contentContainer: {
    flexDirection: 'row',
    backgroundColor: Color.accordionContentBgColor,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 5
  },
  contentTitleLabel: {
    fontSize: wp(smLabelSize),
  },
  participantNumberContainer: {
    width: 25,
    height: 25,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.lightGrayColor,
    marginLeft: 6,
    marginBottom: 10
  },
  participantNumberLabel: {
    color: Color.whiteColor,
    margin: 0,
    marginLeft: -1,
    marginTop: 1
  }
});

export default CriteriaAccordionComponentStyles;