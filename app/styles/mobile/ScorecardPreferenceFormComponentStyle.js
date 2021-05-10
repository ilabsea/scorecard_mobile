import { StyleSheet } from 'react-native';
import Color from '../../themes/color';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { mdLabelSize, mdIconSize } from '../../constants/mobile_font_size_constant';

const scorecardPreferenceFormComponentStyles = StyleSheet.create({
  inputLabel: {
    backgroundColor: Color.whiteColor,
    color: Color.inputBorderLineColor,
    fontSize: 12,
    marginLeft: 12,
    paddingHorizontal: 6,
    position: 'absolute',
  },
  dropDownContainer: {
    marginTop: 20,
    position: 'relative',
  },
  dateLabel: {
    fontSize: wp(mdLabelSize),
  },
  dateIcon: {
    fontSize: wp(mdIconSize),
  },
  formContainer: {
    paddingBottom: hp('35%'),
  }
});

export default scorecardPreferenceFormComponentStyles;
