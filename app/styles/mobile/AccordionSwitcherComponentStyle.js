import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { smLabelSize } from '../../constants/mobile_font_size_constant';
import Color from '../../themes/color';

const AccordionSwitcherComponentStyles = StyleSheet.create({
  filterBtn: {
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Color.clickableColor,
    width: wp('32%')
  },
  activeBtn: {
    backgroundColor: Color.clickableColor
  },
  btnText: {
    fontSize: wp(smLabelSize),
    color: Color.clickableColor,
    textAlign: 'center'
  },
  activeText: {
    color: Color.whiteColor
  },
  btnRight: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    marginLeft: -1
  },
  btnLeft: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6
  }
});

export default AccordionSwitcherComponentStyles;