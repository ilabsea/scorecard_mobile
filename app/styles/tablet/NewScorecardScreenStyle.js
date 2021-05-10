import { StyleSheet } from 'react-native';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const NewScorecardScreenStyles = StyleSheet.create({
  formContainer: {
    width: '65%',
    maxWidth: 360,
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
});

export default NewScorecardScreenStyles;