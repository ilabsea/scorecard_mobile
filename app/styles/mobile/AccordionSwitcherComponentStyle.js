import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../themes/color';
import { getMobileFontSizeByPixelRatio } from '../../utils/font_size_util';
import { XHDPIRatio } from '../../constants/screen_size_constant';

const AccordionSwitcherComponentStyles = StyleSheet.create({
  filterBtn: {
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Color.clickableColor,
    width: wp('36%')
  },
  activeBtn: {
    backgroundColor: Color.clickableColor
  },
  btnText: {
    fontSize: getMobileFontSizeByPixelRatio(XHDPIRatio, 14, 13.2),
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