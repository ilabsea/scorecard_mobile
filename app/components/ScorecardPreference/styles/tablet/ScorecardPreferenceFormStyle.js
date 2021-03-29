import { StyleSheet } from 'react-native';
import Color from '../../../../themes/color';

const scorecardPreferenceFormStyles = StyleSheet.create({
  inputLabel: {
    backgroundColor: 'white',
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
    fontSize: 16,
  },
  dateIcon: {
    fontSize: 25,
  },
  formContainer: {
    paddingBottom: 28,
  }
});

export default scorecardPreferenceFormStyles;
