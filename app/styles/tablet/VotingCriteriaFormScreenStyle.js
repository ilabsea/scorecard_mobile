import { StyleSheet } from 'react-native';
import Color from '../../themes/color';

const VotingCriteriaFormScreenStyles = StyleSheet.create({
  title: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 18,
  },
  itemSeparator: {
    backgroundColor: Color.paleGrayColor,
    height: 20,
    marginBottom: -3
  }
});

export default VotingCriteriaFormScreenStyles;