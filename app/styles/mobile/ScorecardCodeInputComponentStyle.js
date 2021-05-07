import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../themes/color';
import { mdLabelSize, xxlLabelSize } from '../../constants/mobile_font_size_constant';
import { FontFamily } from '../../assets/stylesheets/theme/font';

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
    marginTop: 4
  },
  inputContainer: {
    backgroundColor: Color.whiteColor,
    borderRadius: 4,
    height: 45,
    width: wp('10%'),
    height: wp('11.7%'),
    textAlign: 'center',
    borderColor: Color.primaryColor,
    borderWidth: 1,
    fontSize: wp(xxlLabelSize),
    fontWeight: 'bold',
    justifyContent: 'center',
    paddingBottom: 9
  }
});

export default ScorecardCodeInputComponentStyles;