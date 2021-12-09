import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../themes/color';
import { mdLabelSize, xxlLabelSize } from '../../constants/mobile_font_size_constant';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { pressableItemSize } from '../../utils/component_util';

const ScorecardCodeInputComponentStyles = StyleSheet.create({
  label: {
    fontSize: wp(mdLabelSize),
    color: Color.whiteColor,
    textShadowColor: Color.blackColor,
    textShadowRadius: 8,
    fontFamily: FontFamily.title,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  inputContainer: {
    backgroundColor: Color.whiteColor,
    borderRadius: 4,
    width: pressableItemSize(),
    height: pressableItemSize(),
    textAlign: 'center',
    borderColor: Color.primaryColor,
    borderWidth: 1,
    fontSize: wp(xxlLabelSize),
    fontWeight: 'bold',
    paddingTop: 0,
    paddingBottom: 2,
    color: Color.blackColor,
  }
});

export default ScorecardCodeInputComponentStyles;