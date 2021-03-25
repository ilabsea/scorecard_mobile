import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { xlLabelSize } from '../../../../constants/mobile_font_size_constant';
import { FontFamily } from '../../../../assets/stylesheets/theme/font';
import { isShortScreenDevice } from '../../../../utils/responsive_util';

const NewScorecardStyles = StyleSheet.create({
  formContainer: {
    width: wp('77%'),
    marginTop: 20,
  },
  inputContainer: {
    fontSize: wp('4.5%'),
    height: isShortScreenDevice() ? hp('8%') : 64,
    marginBottom: isShortScreenDevice() ? 0 : 20,
  },
  textInput: {
    height: isShortScreenDevice() ? hp('8%') : 64,
    paddingLeft: 40,
    fontSize: wp('4.5%'),
    fontFamily: FontFamily.body,
  },
  button: {
    marginTop: 16,
    height: isShortScreenDevice() ? hp('8%') : 64,
  },
  buttonLabel: {
    fontSize: wp(xlLabelSize),
  },
});

export default NewScorecardStyles;