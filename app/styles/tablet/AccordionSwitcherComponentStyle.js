import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../themes/color';
import { bodyFontSize } from '../../utils/font_size_util';

const AccordionSwitcherComponentStyles = StyleSheet.create({
  filterBtn: {
    paddingVertical: 6,
    borderWidth: 1.5,
    borderColor: Color.clickableColor,
    width: wp('33%')
  },
  activeBtn: {
    backgroundColor: Color.clickableColor
  },
  btnText: {
    fontSize: bodyFontSize(),
    color: Color.clickableColor,
    textAlign: 'center'
  },
  activeText: {
    color: Color.whiteColor
  },
  btnRight: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6
  },
  btnLeft: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6
  }
});

export default AccordionSwitcherComponentStyles;