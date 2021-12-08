import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { xlLabelSize, mdLabelSize, smLabelSize } from '../../constants/mobile_font_size_constant';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { isShortScreenDevice, isShortWidthScreen } from '../../utils/responsive_util';
import Color from '../../themes/color';

const NewScorecardScreenStyles = StyleSheet.create({
  formContainer: {
    // width: wp('77%'),
    width: wp('82%'),
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
  retryLink: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: isShortScreenDevice() ? 0 : 5,
    flexDirection: 'row',
    backgroundColor: Color.primaryColor,
    paddingHorizontal: 14,
    paddingVertical: 2,
    borderRadius: 20,
    marginBottom: isShortScreenDevice() ? 10 : 0,
  },
  messageLabel: {
    fontSize: wp(smLabelSize),
    marginRight: 2
  },
  errorMessageLabel: {
    fontSize: isShortWidthScreen() ? wp(mdLabelSize) : isShortScreenDevice() ? wp(smLabelSize) : 16 ,
    color: Color.errorColor,
    textShadowColor: Color.lightBlackColor,
    textShadowOffset: { width: 0.4, height: 0.4 },
    textShadowRadius: 0.1
  },
  rejoinLink: {
    color: Color.whiteColor,
    textAlign: 'center',
  }
});

export default NewScorecardScreenStyles;