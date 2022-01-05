import { StyleSheet } from 'react-native';
import Color from '../../themes/color';
import { bodyFontSize } from '../../utils/font_size_util';

const ScorecardCodeInputComponentStyles = StyleSheet.create({
  label: {
    fontSize: bodyFontSize(),
    color: Color.whiteColor,
    textShadowColor: Color.lightBlackColor,
    textShadowRadius: 5
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    height: 55,
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