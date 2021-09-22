import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../themes/color';

const AccordionSwitcherComponentStyles = StyleSheet.create({
  filterBtn: {
    paddingVertical: 6,
    borderWidth: 1.5,
    borderColor: Color.clickableColor,
    width: wp('28%'),
  },
  activeBtn: {
    backgroundColor: Color.clickableColor,
    borderWidth: 0,
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 16,
    color: Color.clickableColor,
    textAlign: 'center'
  },
  activeText: {
    color: Color.whiteColor
  },
  btnRight: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderColor: Color.clickableColor,
  },
  btnLeft: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  }
});

export default AccordionSwitcherComponentStyles;