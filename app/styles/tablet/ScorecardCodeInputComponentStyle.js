import { StyleSheet } from 'react-native';
import Color from '../../themes/color';

const ScorecardCodeInputComponentStyles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: Color.whiteColor,
    textShadowColor: Color.lightBlackColor,
    textShadowRadius: 5
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4
  },
  inputContainer: {
    backgroundColor: Color.whiteColor,
    borderRadius: 4,
    width: 55,
    height: 55,
    textAlign: 'center',
    borderColor: Color.primaryColor,
    borderWidth: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: Color.blackColor,
  }
});

export default ScorecardCodeInputComponentStyles;