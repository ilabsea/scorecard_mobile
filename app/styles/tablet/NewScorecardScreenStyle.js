import { StyleSheet } from 'react-native';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import Color from '../../themes/color';

const NewScorecardScreenStyles = StyleSheet.create({
  formContainer: {
    width: '65%',
    maxWidth: 400,
    marginTop: 20,
  },
  inputContainer: {
    fontSize: 22,
    height: 64,
    marginBottom: 20,
  },
  textInput: {
    height: 64,
    paddingLeft: 40,
    fontSize: 20,
    fontFamily: FontFamily.body,
  },
  button: {
    marginTop: 16,
    height: 64,
  },
  buttonLabel: {
    fontSize: 20
  },
  retryLink: {
    alignSelf: 'center',
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Color.primaryColor,
    paddingHorizontal: 14,
    paddingVertical: 2,
    borderRadius: 20,
  },
  messageLabel: {
    fontSize: 14,
    marginRight: 2
  },
  errorMessageLabel: {
    fontSize: 16,
    color: Color.errorColor,
    textShadowColor: Color.lightBlackColor,
    textShadowOffset: { width: 0.4, height: 0.4 },
    textShadowRadius: 0.1,
  },
  rejoinLink: {
    color: Color.whiteColor,
    textAlign: 'center',
  }
});

export default NewScorecardScreenStyles;