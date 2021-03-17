import { StyleSheet } from 'react-native';
import Color from '../../../themes/color';
import { FontFamily } from '../../../assets/stylesheets/theme/font';
import {
  getResponsiveSize,
  getBigButtonWidth,
  getTitleFontSize,
} from '../../../utils/responsive_util';

const responsiveWidth = getBigButtonWidth();

const NewScorecardStyles = StyleSheet.create({
  errorLabel: {
    color: Color.errorColor,
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  formContainer: {
    width: responsiveWidth,
    maxWidth: 360,
    marginTop: 20,
  },
  textInput: {
    fontSize: getResponsiveSize(22, 16),
    height: 64,
    marginBottom: 20,
  },
  textInputValue: {
    height: 64,
    paddingLeft: 40,
    fontSize: getResponsiveSize(20, 16),
    fontFamily: FontFamily.body,
  },
  button: {
    marginTop: 16,
    height: 64,
  },
  buttonLabel: {
    fontSize: getTitleFontSize(),
  },
});

export default NewScorecardStyles;